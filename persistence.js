import firestore from '@react-native-firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

export class UserPersistence {
}

//TODO: Verifiy email format

/**
 * Initializes a brand new user account for a specific email
 * address. If a user account is already associated with the
 * provided email address, a UserAlreadyExistsError is thrown.
 * Otherwise, user and user data entities are initialized and
 * a User object is created and returned.
 * 
 * @param {String} email email associated with the user
 * @returns {Promise<User>} a Promise containing the User object
 */
UserPersistence.initializeUser = email => {
    const userReference = firestore().doc(`users/${email}`);

    return firestore().runTransaction(async transaction => {
        const user = await transaction.get(userReference);

        if (user.exists) {
            throw new UserAlreadyExistsError(email);
        }

        const userId = uuidv4();

        await transaction.set(userReference, {
            user_id: userId
        })

        const userDataReference = firestore().doc(`user_data/${userId}`);

        await transaction.set(userDataReference, {
            points: 0
        })

        return new User(email, userId);
    })
}

/**
 * Retrieves a specific user based on their email. If the query is
 * successful, a Promise containing a User object is created and 
 * returned. Otherwise, a UserNotFoundError is thrown.
 * 
 * @param {String} email email associated with the user
 * @returns {Promise<User>} a Promise containing the User object
 */
UserPersistence.getUser = async email => {
    const user = await firestore()
        .collection("users")
        .doc(email)
        .get();

    if (!user.exists) {
        throw new UserNotFoundError(email);
    }

    const fetchedData = user.data();
    return new User(
        email, 
        fetchedData.user_id
    );
}

/**
 * Retrieves data associaged to a specific user. If the query is
 * successful, a Promise containing a UserData object is created and 
 * returned. Otherwise, a UserDataNotFoundError is thrown.
 * 
 * @param {String} userId user id associated with a specific user
 * @returns {Promise<UserData>} a Promise containing the UserData object
 */
UserPersistence.getUserData = async userId => {
    const userData = await firestore()
        .collection("user_data")
        .doc(userId)
        .get();

    if (!userData.exists) {
        throw new UserDataNotFoundError(userId);
    }

    const fetchedData = userData.data();
    return new UserData(
        userId,
        fetchedData.points
    );
}

/**
 * Adds a specified amount of points to a user account associated with
 * the specified user id. If there is no data associated with the
 * provided user id, a UserDataNotFoundError is thrown. If an illegal
 * modification is attempted, an InvalidPointUpdateError is thrown.
 * 
 * @param {String} userId user if associated with a specific user
 * @param {Number} points amount of points to add
 * @returns {Promise<any>}
 */
UserPersistence.addPointsToUser = (userId, points) => {
    const userDataReference = firestore().doc(`user_data/${userId}`);

    return firestore().runTransaction(async transaction => {
        const userData = await transaction.get(userDataReference);

        if (!userData.exists) {
            throw new UserDataNotFoundError(userId)
        }

        const currentPoints = userData.data().points;

        if (currentPoints + points < 0) {
            throw new InvalidPointUpdateError(userId, "Negative points not allowed");
        }

        return transaction.update(userDataReference, {
            points: currentPoints + points
        });
    })
}

/**
 * Removes a specified amount of points to a user account associated with
 * the specified user id. If there is no data associated with the
 * provided user id, a UserDataNotFoundError is thrown. If an illegal
 * modification is attempted, an InvalidPointUpdateError is thrown.
 * 
 * @param {String} userId user if associated with a specific user
 * @param {Number} points amount of points to remove
 * @returns {Promise<any>}
 */
UserPersistence.removePointsFromUser = (userId, points) => {
    return UserPersistence.addPointsToUser(userId, -points);
}

/**
 * An object which can be used to store retrieved information about
 * a user.
 */
export class User {
    /**
     * @param {String} email email associated with the user
     * @param {String} userId id associated with the user
     */
    constructor(email, userId) {
        this.email = email;
        this.userId = userId;
    }
}

/**
 * An object which can be used to store retrieved user data.
 */
export class UserData {
    /**
     * @param {String} userId id associated with the user
     * @param {Number} points number of points that is available to the user
     */
    constructor(userId, points) {
        this.userId = userId;
        this.points = points;
    }
}

/**
 * Defined error types which can be used to check for specific persistence errors. 
 */
export const PersistenceErrorType = {
    USER_ALREADY_EXISTS:  "persistence/userAlreadyExists",
    USER_NOT_FOUND:       "persistence/userNotFound",
    USER_DATA_NOT_FOUND:  "persistence/userDataNotFound",
    INVALID_POINT_UPDATE: "persistence/invalidPointUpdate"
}

class PersistenceError extends Error {
    constructor(message, type) {
        super(message);
        this.type = type;
    }
}

class UserAlreadyExistsError extends PersistenceError {
    constructor(email) {
        super(`User with email '${email}' already exists`, PersistenceErrorType.USER_ALREADY_EXISTS);
    }
}

class UserNotFoundError extends PersistenceError {
    constructor(email) {
        super(`User with email '${email}' not found`, PersistenceErrorType.USER_NOT_FOUND);
    }
}

class UserDataNotFoundError extends PersistenceError {
    constructor(userId) {
        super(`Data for user with id '${userId}' not found`, PersistenceErrorType.USER_DATA_NOT_FOUND);
    }
}

class InvalidPointUpdateError extends PersistenceError {
    constructor(userId, reason) {
        super(`Invalid point update for user '${userId}' [${reason}]`, PersistenceErrorType.INVALID_POINT_UPDATE);
    }
}