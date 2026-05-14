namespace capstone.web.api.Endpoints
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Http;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.IdentityModel.Tokens;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using System.Text;
    using capstone.web.api.Data;
    using capstone.web.api.Models;
    using System.Net.Http;

    public static class QuestEndpoints
    {
        public static void MapQuestEndpoints(this IEndpointRouteBuilder routes)
        {
            var group = routes.MapGroup("/api/quests");

            // GET: /api/quests
            group.MapGet("/", async (AppDbContext db, HttpContext httpContext) =>
            {
                var userIdClaim = httpContext.User.FindFirst("id");
                var userRoleClaim = httpContext.User.FindFirst(ClaimTypes.Role);

                if (userIdClaim == null || userRoleClaim == null)
                {
                    return Results.Unauthorized();
                }
                var userId = int.Parse(userIdClaim.Value);
                var userRole = userRoleClaim.Value;


                if (userRole == "Administrator")
                {
                    var allQuests = await db.Quests.Where(q => !q.IsDeleted).ToListAsync();
                    return Results.Ok(allQuests);
                }
                else
                {
                    // Otherwise, filter quests based on the user's ID
                    var userQuests = await db.Quests.Where(q => q.UserId == userId && !q.IsDeleted).ToListAsync();
                    return Results.Ok(userQuests);
                }

                //  var quests = await db.Quests.Where(q => !q.IsDeleted && q.UserId == userId).ToListAsync();
                // return Results.Ok(quests); 




            });

            // GET: /api/quests/{id}
            group.MapGet("/{id:int}", async (int id, AppDbContext db, HttpContext httpContext) =>
            {
                var userIdClaim = httpContext.User.FindFirst("id");
                var userRoleClaim = httpContext.User.FindFirst(ClaimTypes.Role);

                if (userIdClaim == null || userRoleClaim == null)
                {
                    return Results.Unauthorized();
                }
                var userId = int.Parse(userIdClaim.Value);
                var userRole = userRoleClaim.Value;


                if (userRole == "Administrator")
                {
                    var allQuest = await db.Quests.Where(q => !q.IsDeleted && q.QuestId == id).FirstOrDefaultAsync();
                    return Results.Ok(allQuest);
                }
                else
                {
                    var quest = await db.Quests.Where(q => !q.IsDeleted && q.UserId == userId).FirstOrDefaultAsync(q => q.QuestId == id);
                    return quest is not null ? Results.Ok(quest) : Results.NotFound();
                }
            });

            // POST: /api/quests
            group.MapPost("/", async (Quest quest, AppDbContext db, HttpContext httpContext) =>
            {
                var userIdClaim = httpContext.User.FindFirst("id");
                if (userIdClaim == null)
                {
                    return Results.Unauthorized();
                }
                var userId = int.Parse(userIdClaim.Value);

                quest.UserId = userId;

                quest.IsDeleted = false;
                quest.DateCreated = DateTime.Now;
                

                db.Quests.Add(quest);
                await db.SaveChangesAsync();
                return Results.Created($"/api/quests/{quest.QuestId}", quest);
            });

            // PUT: /api/quests/{id}
            group.MapPut("/{id:int}", async (int id, Quest updatedQuest, AppDbContext db, HttpContext httpContext) =>
            {

                var userIdClaim = httpContext.User.FindFirst("id");
                if (userIdClaim == null)
                {
                    return Results.Unauthorized();
                }
                var userId = int.Parse(userIdClaim.Value);

                var quest = await db.Quests.FindAsync(id);
                if (quest is null) return Results.NotFound();

                // Propeties be updated.
                quest.Name = updatedQuest.Name;  
                quest.DateCreated = updatedQuest.DateCreated;
                quest.DueDate = updatedQuest.DueDate;
                quest.CategoryId = updatedQuest.CategoryId;
                quest.PriorityId = updatedQuest.PriorityId;
                quest.StatusId = updatedQuest.StatusId;
                

                await db.SaveChangesAsync();
                return Results.NoContent();
            });

            // DELETE: /api/quests/{id}
            group.MapDelete("/{id:int}", async (int id, AppDbContext db, HttpContext httpContext) =>
            {
                
                var quest = await db.Quests.FindAsync(id);
                if (quest is null) return Results.NotFound();

                quest.IsDeleted = true;
                await db.SaveChangesAsync();
                return Results.NoContent();
            });
        }
    }

}
