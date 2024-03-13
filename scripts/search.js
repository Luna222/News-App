'use strict';
/*******************************************************************************
 * Variables
 ******************************************************************************/
let app, user, queryKey;

/*******************************************************************************
 * Functions
 ******************************************************************************/
/**
 * @brief initialize default state
 */
const initSearch = async function () {
  app = new App();
  user = new User(
    app.getCurUser().firstName,
    app.getCurUser().lastName,
    app.getCurUser().userName,
    app.getCurUser().password
  );

  //render results page where User left on
  if (user.getSearchPage() >= 1) {
    queryKey = user.getCurQueryKey();

    const reqSearchedNews = user.getNewsByKey(
      app.isLoggedIn(),
      user.getSearchPage() - 1,
      queryKey
    );
    reqSearchedNews?.call(user);
  }

  //Re-set News page to page 0
  user.resetNewsPage();
};
initSearch();

/*******************************************************************************
 * Handle Events
 ******************************************************************************/
/**
 * @brief handle searching event
 */
btnSearch.addEventListener('click', async function () {
  queryKey = inputQuery.value.trim().toLowerCase();

  if (!queryKey) {
    queryKey = user.getCurQueryKey();
    inputQuery.value = user.getCurQueryKey();
    return alert('Please enter some keywords!');
  }

  if (queryKey) user.resetSearchPage();

  const reqSearchedNews = user.getNewsByKey(app.isLoggedIn(), 0, queryKey);
  reqSearchedNews?.call(user);
});

/*
to navigate back n forth through the pages while rendering the corresponding data, I will use Closure behavior in JS:
*/
/**
 * @brief handle going forwards event
 */
btnNext.addEventListener('click', function () {
  const reqSearchedNews = user.getNewsByKey(
    app.isLoggedIn(),
    user.getSearchPage(),
    queryKey
  );
  reqSearchedNews?.call(user);
});

/**
 * @brief handle going backwards event
 */
btnPrev.addEventListener('click', function () {
  const reqSearchedNews = user.getNewsByKey(
    app.isLoggedIn(),
    user.getSearchPage(),
    queryKey
  );
  reqSearchedNews?.call(user);
});
