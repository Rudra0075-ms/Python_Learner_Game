# Python Quest: Code the World — User Manual 

This manual explains how to use the Python Quest learning-game experience shown in the Google AI Studio preview. Exact menus and features may change as the application develops.

> **Availability note:** The GitHub repository did not contain application source files when this manual was added. Use the published preview or application supplied by the project owner. This manual cannot confirm that every described control is available in every build.

## 1. What is Python Quest?

Python Quest is an adventure-style way to practise Python. You read a mission, write code, run it, inspect the result, and check whether it satisfies the objective.

The preview includes a fantasy game area, a Python editor, an execution console, mission objectives, and controls such as **Run**, **Check Solution**, **Hint**, and **Reset**.

## 2. Start a mission

1. Open the game.
2. Use the map or mission navigation to select a world or level.
3. Read the mission title and objective shown in the mentor panel.
4. Identify what the program must accomplish before writing code.
5. Follow any in-game instructions for the current lesson.

Do not assume that a mission is complete just because the code runs without an error. The solution must also satisfy its objective.

## 3. Write and run Python code

1. Select the **Python Editor** area.
2. Enter Python code for the current objective.
3. Select **Run**.
4. Read the output in the execution console.
5. If an error appears, read the message and correct your code.
6. Run the program again.

For example, if the editor accepts ordinary Python, try:

```python
print("Hello, Python Quest!")
```

Expected output:

```text
Hello, Python Quest!
```

This is a basic execution check; it does not complete every mission.

## 4. Use the game controls

### Run

Executes the code currently in the editor. Check the console for output and errors.

### Check Solution

Checks whether the current code meets the mission requirements. A program can run successfully and still fail the mission if its logic is incorrect.

### Hint

Use a hint when you are stuck. Try to understand the concept and write the solution yourself before looking at a complete answer, if one is offered.

### Reset

May reset the current mission or game state. Read any confirmation prompt carefully, because resetting may discard current work.

### View Canonical Solution

If this option is available, use it to compare your approach with the reference solution after making a genuine attempt. Then close the solution and try to reproduce the logic independently.

### Map and level navigation

Use the map or level navigation to explore available worlds and missions. The available destinations depend on the current build.

## 5. Learn effectively

For each mission, follow this cycle:

1. **Understand:** Explain the objective in your own words.
2. **Predict:** Decide what your code should do.
3. **Code:** Write the smallest solution that could work.
4. **Run:** Check the actual output.
5. **Debug:** Fix one issue at a time.
6. **Validate:** Use **Check Solution**.
7. **Reflect:** Identify the Python concept you practised.

When a solution fails, check spelling, indentation, capitalization, variable names, conditions, and loop boundaries.

## 6. Beginner examples

### Output

```python
print("My Python adventure begins!")
```

### Variables

```python
hero = "Scribe"
xp = 100

print(hero)
print(xp)
```

### Conditions

```python
keys_found = 3

if keys_found >= 3:
    print("The portal is unlocked!")
else:
    print("Find more keys.")
```

### Loops

```python
for step in range(1, 4):
    print("Step", step)
```

These examples are ordinary Python practice snippets. A particular mission may require a different answer or a specific game command.

## 7. Troubleshooting

### The Run button does nothing

- Wait for the application and Python runtime to finish loading.
- Try a short program such as `print("Hello")`.
- Refresh the page once if the interface is unresponsive.
- If the problem continues, capture the browser console and execution-console errors.

### The console reports a DataCloneError or a worker error

This is an application/runtime issue, not normally a Python syntax mistake. A Web Worker may be receiving a value it cannot clone through `postMessage()`.

- Record the full error text.
- Avoid repeatedly pressing Run if it creates more errors.
- Refresh the page and retry once.
- Report the issue with the mission name, the Python code used, and the full error message.

Do not fix this by hiding errors or pretending the program succeeded. The application's worker messaging and result serialization need to be corrected and tested.

### The code runs but Check Solution fails

- Read the objective again.
- Check required variable names, output, conditions, and expected behavior.
- Try a small test case.
- Remember that producing some output is not the same as solving the challenge.

### Progress or XP does not update

- Confirm that the solution was accepted, not merely executed.
- Check whether the interface reports a success state.
- If a correct solution is accepted but progress does not change, report it as a game-state issue.

### The game world is blank or does not move

- Wait for the 3D scene to load.
- Try a current browser with hardware acceleration enabled.
- Check for blocked assets or WebGL errors in the browser console.
- If the game renders but a movement command has no effect, include the submitted code and console output in your report.

## 8. Good habits and safety

- Never enter passwords, API keys, or other secrets into coding exercises.
- Do not assume that code running in a browser is automatically isolated from every risk.
- Use hints to understand concepts rather than blindly copying answers.
- Save your work elsewhere if the current build does not clearly support progress saving.
- Report bugs with steps to reproduce them and the exact error message.

## 9. Reporting a bug

When reporting an issue, include:

- Browser and operating system
- World and mission name
- The steps taken before the issue
- The Python code submitted, if relevant
- Expected result and actual result
- Complete error message or screenshot

Do not include credentials or other private information in a bug report.

## 10. Quick reference

| Goal | Action |
|---|---|
| Execute Python | **Run** |
| Validate the mission | **Check Solution** |
| Get help | **Hint** |
| Restart the current activity | **Reset**, after checking its effect |
| Review a reference answer | **View Canonical Solution**, if available |
| Explore levels | Map or level navigation |

---

**Quest mindset:** Read carefully, write a little, run often, and treat errors as clues. 🐍
