//Registration exceptions
const weakPasswordException = "Firebase: Password should be at least 6 characters (auth/weak-password).";

//Login exceptions
const invalidEmailException = "Firebase: Error (auth/invalid-email).";
const incorrectPasswordException = "Firebase: Error (auth/wrong-password).";
const missingPasswordException = "Firebase: Error (auth/missing-password).";

//Recover password exceptions
const missingEmailException = "Firebase: Error (auth/missing-email).";

export {
    invalidEmailException,
    incorrectPasswordException,
    missingPasswordException,
    missingEmailException,
    weakPasswordException
}