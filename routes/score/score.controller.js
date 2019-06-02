/*
Import
*/
    const ScoreModel = require('../../models/score.model')
    const UserModel = require('../../models/user.model')
//



/*
Methods
*/
    const createItem = (body, userId) => {
        return new Promise( (resolve, reject) => {
            // Définition de l'objet à enregistrer
            const newScore = {
                tap: body.NumeroTap,
                user: userId,
                date: new Date()
            }

            // create new user
            ScoreModel.create(newScore)
            .then( mongoResponse => resolve(mongoResponse) )
            .catch( mongoResponse => reject(mongoResponse) )
        });
    };

    const readItem = (body, userId) => {
        return new Promise( (resolve, reject) => {
            ScoreModel.find((error, score) => {
                if(error) reject(error) // Mongo Error
                else {
                    // resolve(chat)
                    let scoreArray = [];
                    ((async function loop() {
                        for (let i = 0; i < score.length; ++i) {
                            const user = await getChatUser(score[i].user);
                            scoreArray.push({user: user, score: score[i]})
                        }
                        // return all posts
                        return resolve(scoreArray);
                    })());
                }
            });
        });
    };

    const getChatUser = id => {
        return new Promise( (resolve, reject) => {
            UserModel.findById( id, { first_name:1, _id: 0 }, (error, user) => {
                if(error) return reject(error) // Mongo Error
                else {
                    return resolve(user)
                }
            });
        })
    }
//

/*
Export
*/
    module.exports = {
        createItem,
        readItem,
    }
//