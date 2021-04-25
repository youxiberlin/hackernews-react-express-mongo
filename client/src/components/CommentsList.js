import { prop, indexBy, values } from 'ramda';
import Comment from './Comment';

const makeCommentsTree = (parent, comments, commentsMap, result = {}) => {
  const kidsComments = parent.kids.map(kid => commentsMap[kid]);
  result.kids = indexBy(prop('id'), kidsComments)

  for (let i = 0; i < comments.length; i++) {
    if (comments[i].kids.length) {
      const newComments = comments.filter(comment => comment.id !== comments[i].id)
      makeCommentsTree(commentsMap[comments[i].id], newComments, commentsMap, result.kids[comments[i].id])
    }
  }
  return result;
}

const CommentsList = ({ comments, story }) => {
  const commentsMap = indexBy(prop('id'), comments);
  const commentsTree = makeCommentsTree(story, comments, commentsMap);

  const renderComments = (comments) => {
    const getKids = (parentObj) => {
      if (!parentObj.kids) return null;
      return values(parentObj.kids)
        .filter(item => !item.deleted)
        .sort((a, b) => b.time - a.time)
        .map((item) => (
          <Comment
            key={item.id}
            item={item}
            getKids={getKids}
            story={story}
          />
        ));
    };

    return (
      <ul className="pl-0 pl-md-4" style={{ listStyleType: "none" }}>
        {getKids(commentsTree)}
      </ul>
    );
  };

  return renderComments(comments)
};

export default CommentsList;
