/** Putting this in the /lib directory ensures that:
    - it loads first
    - it is available in both the client & server environments
**/

/**
 * Check that the specified user owns the document
 * 
 * @param   {String}  userId The id of the user who purportedly owns the document in question
 * @param   {Object}  doc   	The document whose ownership is in question
 * @returns {Boolean} Whether or not the user owns the document
 */
ownsDocument = function(userId, doc) {
  return (doc && doc.userId === userId);
};