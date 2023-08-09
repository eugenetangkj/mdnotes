//Registration errors
const weakPasswordException = "Firebase: Password should be at least 6 characters (auth/weak-password).";

//Login errors
const invalidEmailException = "Firebase: Error (auth/invalid-email).";
const incorrectPasswordException = "Firebase: Error (auth/wrong-password).";
const missingPasswordException = "Firebase: Error (auth/missing-password).";

//Recover password error
const missingEmailException = "Firebase: Error (auth/missing-email).";

export {
    invalidEmailException,
    incorrectPasswordException,
    missingPasswordException,
    missingEmailException,
    weakPasswordException
}