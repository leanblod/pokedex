import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { AfterViewInit, Component, EventEmitter, Inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  styleUrls: ['./pokemon-form.component.scss']
})
export class PokemonFormComponent implements AfterViewInit, OnChanges {

  /**
   * If absent, the form would be a creation form
   */
  @Input() pokemon?: Pokemon | null;
  @Output() submit: EventEmitter<Pokemon> = new EventEmitter<Pokemon>();

  pokemonForm: FormGroup = this.newForm(this.pokemon);
  editInput: Subject<boolean> = new Subject<boolean>();

  constructor(
    private pokeApiService: PokeApiService,
    @Inject(Logger) private logger: Logger,
    private fb: FormBuilder,  // Maybe will implement the fb.nonNullable.group(...) constructor
  ) {}

  ngAfterViewInit(): void {
    this.editInput.next(false);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['pokemon']) {
      this.pokemonForm = this.newForm(this.pokemon);
    }
  }

  /**
   * Form creation based on Input update
   * @param pokemon Pokemon to modify or null | undefined to create
   */
  private newForm(pokemon?: Pokemon | null) {
    return new FormGroup({

      //#region This values shoudn't change, maybe I'll use the pokemon's id value anyways
      id: new FormControl(
        {
          value: pokemon?.id??null,
          disabled: true,
        },
        {
          nonNullable: true,
        }
      ),

      sprites: new FormControl(
        {
          value: pokemon?.sprites??null,
          disabled: true,
        },
        {
          nonNullable: true,
        }
      ),
      //#endregion

      name: new FormControl(
        pokemon?.name??null,
        {
          nonNullable: true,
          validators: [ Validators.required ],
          asyncValidators: [ this.pokemonNameAvailability(pokemon) ]
        }),

      base_experience: new FormControl(
        pokemon?.base_experience??null,
        {
          nonNullable: true,
        }),

      height: new FormControl(
        pokemon?.height??null,
        {
          nonNullable: true,
        }),

      is_default: new FormControl(
        pokemon?.is_default??null,
        {
          nonNullable: true,
        }),

      order: new FormControl(
        pokemon?.order??null,
        {
          nonNullable: true,
        }),

      weight: new FormControl(
        pokemon?.weight??null,
        {
          nonNullable: true,
        }),

      abilities: new FormArray(pokemon?.abilities.map(
        ability => new FormControl(
          ability.ability.name,
          {
            nonNullable: true,
          }
        )
      )??[]),

      forms: new FormArray(pokemon?.forms.map(
        form => new FormControl(
          form.name,
          {
            nonNullable: true
          }
        )
      )??[]),

      game_indices: new FormArray(pokemon?.game_indices.map(
        index => new FormGroup({
          game_index: new FormControl(index.game_index),
          version: new FormControl(index.version.name),
        })
      )??[]),

      held_items: new FormArray(pokemon?.held_items.map(
        held_item => new FormControl(
          held_item.item.name,
          {
            nonNullable: true,
          }
        )
      )??[]),

      location_area_encounters: new FormControl(
        pokemon?.location_area_encounters??null,
        {
          nonNullable: true,
        }),

      moves: new FormArray(pokemon?.moves.map(
        move => new FormControl(move.move.name)
      )??[]),

      past_types: new FormArray(pokemon?.past_types.map(
        past_type => new FormGroup({
          generation: new FormControl(
            past_type.generation.name,
            {
              nonNullable: true
            },
          ),

          types: new FormArray(past_type.types
            .sort((type1, type2) => type1.slot - type2.slot)
            .map(
              type => new FormControl(
                type.type,
                {
                  nonNullable: true
                }
              )
          )),
        })
      )??[]),

      species: new FormControl(
        pokemon?.species.name,
        {
          nonNullable: true,
        }
      ),
      stats: new FormArray(pokemon?.stats.map(
        stat => new FormGroup({
          stat: new FormControl(
            stat.stat.name,
            {
              nonNullable: true,
            }
          ),

          base_stat: new FormControl(
            stat.base_stat,
            {
              nonNullable: true,
            }
          ),

          effort: new FormControl(
            stat.effort,
            {
              nonNullable: true,
            }
          ),

        })
      )??[]),

      types: new FormArray(pokemon?.types.map(
        type => new FormControl(
          type.type.name,
          {
            nonNullable: true,
          }
        )
      )??[]),

    });
  }

  resetForm() {
    this.pokemonForm.reset();
    this.pokemonForm.markAsUntouched();
    this.editInput.next(false);
  }

  private pokemonNameAvailability(pokemon?: Pokemon | null): AsyncValidatorFn {
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
          { match: value.id }
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

  getControlErrors(control: string) {
    return this.pokemonForm.get(control)?.errors??{};
  }

  getFormArray(control: string) {
    return this.pokemonForm.get(control) as FormArray<FormControl>;
  }

  getFormArrayAsGroup(control: string) {
    return this.pokemonForm.get(control) as FormArray<FormGroup>;
  }

  send(data: Pokemon) {
    this.pokemonForm.markAllAsTouched();
    if(this.pokemonForm.valid) {
      const pokemon: Pokemon = Object.assign(this.pokemon??{}, data);
      this.submit.emit(pokemon);
      this.editInput.next(false);
      this.pokemonForm.markAsUntouched();
    } else if(this.pokemonForm.pending) {
      alert('The form is beeing validated, try again in a jiffy');
    } else if(this.pokemonForm.invalid) {
      alert('The form is invalid');
    } else if(this.pokemonForm.disabled) {
      alert('The form is disabled');
    }
  }

}
