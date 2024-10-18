/**
 * Firebase packages are pretty heavy:
 * https://github.com/firebase/firebase-js-sdk/issues/332
 *
 * Even though declared as tree-shakeable, it seems like the
 * whole packages are included to the production bundle.
 * */

/**
 * The following lazy-load implementation was inspired by
 * this: https://gist.github.com/dyaa/8f8d1f8964160630f2475fe26a2e6150?permalink_comment_id=4065558#gistcomment-4065558
 * */
const getFirebase = async () => {
  const [firestore] = await Promise.all([import('./init/firestore')]);

  return { firestore };
};

export default getFirebase;
