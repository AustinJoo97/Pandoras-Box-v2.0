export default getTwoFavoriteGenres = (userObj) => {
    let allGenres = [];
    let favoritesObj = {};
    let topGenre;
    let secondGenre;
    let thirdGenre;

    userObj.favorites.map((favoritedAlbum) => {
        allGenres.push(favoritedAlbum.genre);
    })

    allGenres.map((genre) => {
        if (favoritesObj[genre]) {
            favoritesObj[genre] += 1;
        } else {
            favoritesObj[genre] = 1;
        }
    })

    const talliedGenres = Object.keys(favoritesObj);

    for (let i = 0; i < talliedGenres.length; i++) {
        if (!topGenre && !secondGenre && !thirdGenre) {
            topGenre = {
                genre: talliedGenres[i],
                count: favoritesObj[talliedGenres[i]]
            };
            secondGenre = {
                genre: talliedGenres[i],
                count: favoritesObj[talliedGenres[i]]
            };
            thirdGenre = {
                genre: talliedGenres[i],
                count: favoritesObj[talliedGenres[i]]
            }
        }

        if (favoritesObj[talliedGenres[i]] >= topGenre.count) {
            thirdGenre = secondGenre;
            secondGenre = topGenre;
            topGenre = {
                genre: talliedGenres[i],
                count: favoritesObj[talliedGenres[i]]
            };
        } else if (favoritesObj[talliedGenres[i]] < topGenre.count && favoritesObj[talliedGenres[i]] >= secondGenre.count) {
            thirdGenre = secondGenre;
            secondGenre = {
                genre: talliedGenres[i],
                count: favoritesObj[talliedGenres[i]]
            };
        } else if (favoritesObj[talliedGenres[i]] < topGenre.count && favoritesObj[talliedGenres[i]] < secondGenre.count && favoritesObj[talliedGenres[i]] >= thirdGenre.count){
            thirdGenre = {
                genre: talliedGenres[i],
                count: favoritesObj[talliedGenres[i]]
            }
        }
    }

    return { topGenre, secondGenre, thirdGenre }
}