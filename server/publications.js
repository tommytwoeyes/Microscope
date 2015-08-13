/**
 * Filters Posts by title
 *
 * @todo Replace this functionality with actual categories:
 * - i.e.:
 *   - Create Category collection
 *   - Add CategorId to Post objects
 *   - Write filterByCategory() function
 *   - Modify publication and subscription accordingly
 *
 * @param   {String} searchString The specific text to find in title
 * @returns {Object} Posts matching [title] query
 */
var filterByTitle = function filterByTitle(searchString) {
	check(searchString, String);

	return Posts.find({
		title: {
			$regex:			searchString,
			$options:		'i'
		}
	});
};

Meteor.publish('posts', filterByTitle);

Meteor.publish('comments', function(postId) {
	check(postId, String);
  return Comments.find({postId: postId});
});