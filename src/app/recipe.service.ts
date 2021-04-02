import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Recipe } from './recipe';

@Injectable({ providedIn: 'root' })
export class RecipeService {

  private recipesUrl = 'api/recipes';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.recipesUrl).pipe(
      tap(_ => this.log('fetched recipes')),
      catchError(this.handleError<Recipe[]>('getRecipes', []))
    );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getRecipeNo404<Data>(id: number): Observable<Recipe> {
    const url = `${this.recipesUrl}/?id=${id}`;
    return this.http.get<Recipe[]>(url).pipe(
      map(recipes => recipes[0]),
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
        this.log(`${outcome} recipe id=${id}`);
      }),
      catchError(this.handleError<Recipe>(`getRecipe id=${id}`))
    );
  }

  /** GET hero by id. Will 404 if id not found */
  getRecipe(id: number): Observable<Recipe> {
    const url = `${this.recipesUrl}/${id}`;
    return this.http.get<Recipe>(url).pipe(
      tap(_ => this.log(`fetched recipe id=${id}`)),
      catchError(this.handleError<Recipe>(`getRecipe id=${id}`))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(this.recipesUrl, recipe, this.httpOptions).pipe(
      tap((newRecipe: Recipe) => this.log(`added recipe w/ id=${newRecipe.id}`)),
      catchError(this.handleError<Recipe>('addRecipe'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteRecipe(id: number): Observable<Recipe> {
    const url = `${this.recipesUrl}/${id}`;
    return this.http.delete<Recipe>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted recipe id=${id}`)),
      catchError(this.handleError<Recipe>('deleteRecipe'))
    );
  }

  /** PUT: update the hero on the server */
  updateRecipe(recipe: Recipe): Observable<any> {
    return this.http.put(this.recipesUrl, recipe, this.httpOptions).pipe(
      tap(_ => this.log(`updated recipe id=${recipe.id}`)),
      catchError(this.handleError<any>('updateRecipe'))
    );
  }
  /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    //this.messageService.add(`HeroService: ${message}`);
  }
}
