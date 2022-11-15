
/**
 * Данные в виде JSON массивов
 */
const Authors = require('./data/authors');
const Posts = require('./data/posts');

/**
 * Подключение необходимых типов graphql
 */
const {
    GraphQLString,
    GraphQLList,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLSchema
} = require('graphql');

/**
 * Создание нового типа для graphql
 * 
 * Необходимо создать объект класса GraphQLObjectType,
 * после чего описать тип свойствами name и description.
 * 
 * Далее fields определяет поля этого типа id, name, twitterHandle
 */
const AuthorType = new GraphQLObjectType({
    name: "Author",
    description: "This represent an Author",
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        twitterHandle: { type: GraphQLString }
    })
});

/**
 * Создание нового типа для graphql (по предыдущему принципу)
 * 
 * Имеет поле author которое находит автора по author_id
 */
const PostType = new GraphQLObjectType({
    name: "Post",
    description: "This represent a Post",
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        body: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve: function (post) {
                return Authors.find(author => author.id === post.author_id);
            }
        }
    })
});


/**
 * Создание нового типа для graphql 
 * 
 * Это тип будет объединять в себе 2 предыдущих и 
 * является корневым
 * 
 * Поля имеют тип GraphQLList который 
 * представляет список объектов с указанным 
 * типом в (AuthorType) или (PostType)
 */
const BlogQueryRootType = new GraphQLObjectType({
    name: 'BlogAppSchema',
    description: "Blog Application Schema Query Root",
    fields: () => ({
        authors: {
            type: new GraphQLList(AuthorType),
            description: "List of all Authors",
            resolve: function () {
                return Authors
            }
        },
        posts: {
            type: new GraphQLList(PostType),
            description: "List of all Posts",
            resolve: function () {
                return Posts
            }
        }
    })
});

/**
 * В схеме присваиваем запросу объект BlogQueryRootType
 * 
 * Будет использовано как корневой запрос
 */
const BlogAppSchema = new GraphQLSchema({
    query: BlogQueryRootType
});

module.exports = BlogAppSchema;