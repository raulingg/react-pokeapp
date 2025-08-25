# Acceptance Criteria (AC)

## Frontend

### Login

- The credentials consist of a username/password form. You should validate the user credentials locally. (admin as username and admin as password, anything different should be considered as incorrect credentials). Shows all the validation that you think makes sense.

- The user should remain logged against a storage instance that fits your preference (Local db, Local storage, cookies), so if the user tries to log in already logged, it should be redirected to the main page, and if it is not logged and it tries to go to the main page it should be redirected to the login page.

### Main page

- The home screen will have a search bar with a list of Pokemon. You’ll have to use this API for it: [https://pokeapi.co](https://pokeapi.co). The API is paginated so you should create a solution for it.

- Each Pokemon should be shown with its photo and name.

### Detail view

- If the user clicks on a Pokemon from the list, a modal should be shown with detailed information about the Pokemon (Abilities, moves, and forms).

> **Notes**
>
> - Feel free to use any library for local state management and UI.
> - You can define any UI/UX definition you need to show the information. This is an example:
>   [https://www.behance.net/gallery/146710797/Pokedex-Ui-Study](https://www.behance.net/gallery/146710797/Pokedex-Ui-Study) but feel free to do it in a way that fits better your preferences.
> - We will evaluate the architecture you think is better for the app. Please take into account.
>   that the app could have more features in the future.
> - Be prepared to discuss your solution.
