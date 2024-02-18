using Hatley.DTO;

namespace Hatley.Services
{
	public interface ICommentRepo
	{
		int Create(CommentDTO commentdto);
		int Delete(int id);
		CommentDTO? GetComment(int id);
		List<CommentDTO>? GetComments();
		int Update(int id, CommentDTO commentdto);
	}
}