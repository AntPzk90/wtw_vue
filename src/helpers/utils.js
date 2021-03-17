const adapter = (data) => {
  if (data.length > 1) {
    let updatedFilms = [];
    data.forEach((film) => {
      let updatedFilm = {
        backgroundColor: film.background_color,
        backgroundImage: film.background_image,
        description: film.description,
        director: film.director,
        genre: film.genre,
        id: film.id,
        isFavorite: film.is_favorite,
        name: film.name,
        posterImage: film.poster_image,
        previewImage: film.preview_image,
        previewVideoLink: film.preview_video_link,
        rating: film.rating,
        released: film.released,
        runTime: film.run_time,
        scoresCount: film.scores_count,
        starring: film.starring,
        videoLink: film.video_link,
      };

      updatedFilms.push(updatedFilm);
    });
    return updatedFilms;
  } else {
    return {
      backgroundColor: data.background_color,
      backgroundImage: data.background_image,
      description: data.description,
      director: data.director,
      genre: data.genre,
      id: data.id,
      isFavorite: data.is_favorite,
      name: data.name,
      posterImage: data.poster_image,
      previewImage: data.preview_image,
      previewVideoLink: data.preview_video_link,
      rating: data.rating,
      released: data.released,
      runTime: data.run_time,
      scoresCount: data.scores_count,
      starring: data.starring,
      videoLink: data.video_link,
    };
  }
};

export const getItem = (key) => {
  try {
    return JSON.parse(sessionStorage.getItem(key));
  } catch (e) {
    console.log('error getting data from localStorage', e);
    return null;
  }
};

const setItem = (key, data) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.log('error setting data in localStorage', e);
  }
};

const updatedData = (films, updatedFilm) => {
  const index = films.findIndex((film) => {
    return film.id === updatedFilm.id;
  });

  films[index] = updatedFilm;
  return films;
};

const secondsToHms = (d) => {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);
  return `${h} : ${m} : ${s}`;
};

export default {
  adapter,
  getItem,
  setItem,
  updatedData,
  secondsToHms,
};
