using Hatley.DTO;

namespace Hatley.Services
{
	public interface ICommentRepo
	{
		int Create(CommentDTO commentdto);
		int Delete(int id);
		CommentDTO? GetComment(int id);
		CommentDTO? GetCommentByOrderId(int order_id);
		List<CommentDTO>? GetComments();
		List<CommentDTO>? CommentsForDelivery(string email);
		int Update(int id, string text);
	}
}