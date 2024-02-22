import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { AfterViewInit, Component, EventEmitter, Inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormArray, FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Logger } from '@models/logger';
import { PokeApiEndpoint } from '@models/poke-api-endpoint';
import { Pokemon } from '@models/poke-api-resources/pokemon';
import { PokeApiService } from '@services/poke-api.service';
import { Subject, catchError, iif, map, mergeMap, of, tap, timer } from 'rxjs';

/**
 * Resource form components don't have access to the service,
 * only share data with the parent component
 */
@Component({
  selector: 'pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.scss'],
})
export class PokemonFormComponent implements AfterViewInit, OnChanges {

  /**
   * If absent, the form would be a creation form
   */
  @Input() pokemon: Pokemon | null = null;

  @Output()
  private submitPokemon: EventEmitter<Pokemon> = new EventEmitter<Pokemon>();

  form = this.newForm();

  editInput: Subject<boolean> = new Subject<boolean>();

  constructor(
    private pokeApiService: PokeApiService,
    @Inject(Logger) private logger: Logger,
    private fb: NonNullableFormBuilder,
  ) {}

  ngAfterViewInit(): void {
    this.editInput.next(false);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['pokemon']) {
      this.form = this.newForm(this.pokemon);
    }
  }

  /**
   * Form creation based on Input update
   * @param pokemon Pokemon to modify or null | undefined to create
   */
  private newForm(pokemon: Pokemon | null = null) {
    return this.fb.group({
      name: [
        pokemon?.name??'',
        [Validators.required],
        [this.pokemonNameAvailability(pokemon)],
      ],

      base_experience: [
        pokemon?.base_experience??0,
        [Validators.min(0)],
      ],

      height: [
        pokemon?.height??0,
      ],

      order: [
        pokemon?.order??0,
      ],

      weight: [
        pokemon?.weight??0,
      ],

      species: this.fb.group({
        name: [
          pokemon?.species.name??'',
        ],
        url: [
          pokemon?.species.url??'',
        ],
      }),

      abilities: this.fb.array(pokemon?.abilities.map(
        ability => [ability],
      )??[]),

      location_area_encounters: [
        pokemon?.location_area_encounters??'',
      ],

      forms: this.fb.array(pokemon?.forms.map(
        form => [form],
      )??[]),

      held_items: this.fb.array(pokemon?.held_items.map(
        held_item => [held_item],
      )??[]),

      moves: this.fb.array(pokemon?.moves.map(
        move => [move],
      )??[]),

      types: this.fb.array(pokemon?.types
        .sort(this.bySlot)
        .map(
          type => [type],
        )
      ??[]),

    });
  }

  resetForm() {
    this.form.reset();
    this.form.markAsUntouched();
    this.editInput.next(false);
  }

  private pokemonNameAvailability(pokemon: Pokemon | null): AsyncValidatorFn {
    const pokeApiService = this.pokeApiService;
    const logger = this.logger;
    const oldName = pokemon?.name.toLowerCase();
    return (control: AbstractControl<string|null>) => {
      const newName = control.value?.toLowerCase();
      return iif(
        ()=> oldName === newName || !newName,
        of(null),
        timer(1500).pipe(
          mergeMap(() => pokeApiService.get(PokeApiEndpoint.Pokemon, newName??'')),
          map((value) => value.name !== newName ?  // Checks if the match was by id
          null :
          { match: value.id },
          ),
          catchError((error: HttpErrorResponse) => {
            if(error.status === HttpStatusCode.NotFound) {
              return of(null);
            } else {
              throw error;
            }
          }),
          tap((errors) => logger.log.info('Name Validation', `Against: ${newName}. Errors: `, errors)),
        ),
      );
    };
  }

  private bySlot<T extends { slot: number }>(item1: T, item2: T) {
    return item1.slot - item2.slot;
  }

  getControlErrors(control: string) {
    return this.form.get(control)?.errors??{};
  }

  getFormArray(control: string) {
    return this.form.get(control) as FormArray<FormControl>;
  }

  getFormArrayAsGroup(control: string) {
    return this.form.get(control) as FormArray<FormGroup>;
  }

  send(data: Partial<Pokemon>) {
    switch(this.form.status) {
      case 'VALID':
        let pokemon = Object.assign({}, this.pokemon, data);
        console.log(pokemon);
        this.submitPokemon.emit(pokemon);
        this.editInput.next(false);
        this.form.markAsUntouched();
        this.form.markAsPristine();
        break;

      case 'PENDING':
        alert('The form is beeing validated, try again in a jiffy');
        break;

      case 'INVALID':
        alert('The form is invalid');
        break;

      case 'DISABLED':
        alert('The form is disabled');
        break;
    }
  }

}
