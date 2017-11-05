const User = require('../database/mongodb/models/user');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLSchema
} = require('graphql');

const users = [{
        'id': 1,
        'username': 'bigby',
        email: 'bigby@email.com'
    },
    {
        'id': 2,
        'username': 'storm',
        'email': 'storm@email.com'
    },
    {
        'id': 3,
        'username': 'donkey',
        'email': 'donkey@email.com'
    }
]

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {
            type: GraphQLInt
        },
        username: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        }
    })
});

const UserQuery = new GraphQLObjectType({
    name: 'UserQuery',
    fields: {
        user: {
            type: UserType,
            args: {
                id: {
                    type: GraphQLInt
                }
            },
            resolve(parentValue, args) {
                User.get
            }
        },
        users: {
            type: new GraphQLList(UserType),
            args: {},
            resolve: getUsers
        }
    }
});

const UserMutation = new GraphQLObjectType({
    name: 'UserMutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                username: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                password: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                email: {
                    type: new GraphQLNonNull(GraphQLString)
                },
            },
            resolve: addUser
        },
        deleteUser: {
            type: UserType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLInt)
                }
            },
            resolve: deleteUser

        }
    }

})

async function addUser(parentValue, args) {
    let newUser = {
        id: 4,
        username: args.username,
        password: args.password,
        email: args.email
    }

    return await newUser;
}

async function deleteUser(parentValue, args) {
    let newUser = {
        username: args.username,
        password: args.password,
        email: args.email
    }

    return await newUser;
}
async function getUsers(parentValue, args) {
    return await users;
}
module.exports = new GraphQLSchema({
    query: UserQuery,
    mutation: UserMutation
});