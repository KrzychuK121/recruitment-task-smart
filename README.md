# Recruitment task

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Challenges

* No knowledge about TypeScript or Redux (or Redux Toolkit).
    * Description: I have never used TypeScript or Redux for my React projects.
    * Solution: I watched my React course section dedicated to basics of Redux with Redux Toolkit and TypeScript. With
      that knowledge I was able to create project that uses this solutions.
* `Object.entries` types issue.
    * Description:
      I had to get every property name and its value inside `UserView` object. The basic problem was that I could not
      get the value because `Object.entries` returned two variables of type string instead of `keyof T` and
      `T[keyof T]`.
    * Solution:
      ```
          const entries = Object.entries as <T>(
            obj: T
          ) => Array<[keyof T, T[keyof T]]>;
      ```  