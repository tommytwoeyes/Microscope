/** Putting this in the /lib directory ensures that:
    - it loads first
    - it is available in both the client & server environments
**/

// Check that the specified user owns the document
ownsDocument = function(userId, doc) {
  return (doc && doc.userId === userId);
};