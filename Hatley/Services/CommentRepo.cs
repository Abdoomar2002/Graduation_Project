using Hatley.DTO;
using Hatley.Models;

namespace Hatley.Services
{
	public class CommentRepo : ICommentRepo
	{
		private readonly Comment comment;
		private readonly appDB context;

		public CommentRepo(Comment _comment, appDB _context)
		{
			comment = _comment;
			context = _context;
		}

		public List<CommentDTO>? GetComments()
		{
			List<Comment> comments = context.comments.ToList();
			if (comments.Count == 0)
			{
				return null;
			}
			List<CommentDTO> commentsdto = comments.Select(x => new CommentDTO()
			{
				Id = x.Comment_ID,
				Text = x.Text,
				CreatedAt=x.CreatedAt,
				Delivery_ID = x.Delivery_ID
			}).ToList();
			return commentsdto;
		}

		public CommentDTO? GetComment(int id)
		{
			var comment = context.comments.FirstOrDefault(x => x.Comment_ID == id);
			if (comment == null)
			{
				return null;
			}
			CommentDTO CommentDTO = new CommentDTO()
			{
				Id = comment.Comment_ID,
				Text = comment.Text,
				CreatedAt=comment.CreatedAt,
				Delivery_ID = comment.Delivery_ID

			};
			return CommentDTO;
		}

		public int Create(CommentDTO commentdto)
		{
			if (commentdto.Delivery_ID == null)
			{
				return -1;
			}

			var checkdeliveryid = context.delivers.FirstOrDefault(x => x.Delivery_ID == commentdto.Delivery_ID);
			if (checkdeliveryid == null)
			{
				return -2;
			}

			comment.Text = commentdto.Text;
			comment.Delivery_ID = commentdto.Delivery_ID;
			comment.CreatedAt=DateTime.Now;
			context.comments.Add(comment);
			int raw = context.SaveChanges();
			return raw;
		}

		public int Update(int id, CommentDTO commentdto)
		{
			var oldComment = context.comments.FirstOrDefault(x => x.Comment_ID == id);
			if (oldComment == null)
			{
				return -1;
			}
			oldComment.Text = commentdto.Text;

			int raw = context.SaveChanges();
			return raw;
		}

		public int Delete(int id)
		{
			var comment = context.comments.FirstOrDefault(x => x.Comment_ID == id);
			if (comment != null)
			{
				context.comments.Remove(comment);
				int raw = context.SaveChanges();
				return raw;
			}
			return -1;
		}
	}
}

