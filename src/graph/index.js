const path = require('path')
const { loadFilesSync } = require('@graphql-tools/load-files')
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge')

const typesArray = loadFilesSync(path.join(__dirname, './**/*'), { 
    extensions: ['graphql'], 
    recursive: true 
})

const mergedTypeDefs = mergeTypeDefs(typesArray);
console.log(typesArray);

const resolversArray = loadFilesSync(path.join(__dirname, './Player/*'), { 
    extensions: ['js'], 
    recursive: true 
})

const mergedResolvers = mergeResolvers(resolversArray);
console.log(mergedResolvers);
// console.log(resolversArray)
// exports = {
//     typeDefs: mergeTypeDefs(typesArray),
//     resolvers: mergeResolvers(resolversArray)
// };
// module.exports.resolversArray = mergeResolvers(resolversArray);
module.exports.typeDefs = mergedTypeDefs;
module.exports.resolvers = mergedResolvers;
