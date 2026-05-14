namespace capstone.web.api
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

    public static class PriorityEndpoints
    {
        public static void MapPriorityEndpoints(this IEndpointRouteBuilder routes)
        {
            var group = routes.MapGroup("/api/priorities");

            // GET: /api/priorities
            group.MapGet("/", async (AppDbContext db) =>
            {
                var priorities = await db.Priorities.ToListAsync();
                return Results.Ok(priorities);
            });

            // GET: /api/priorities/{id}
            group.MapGet("/{id:int}", async (int id, AppDbContext db) =>
            {
                var priority = await db.Priorities.FindAsync(id);
                return priority is not null ? Results.Ok(priority) : Results.NotFound();
            });

            // POST: /api/priorities
            group.MapPost("/", async (Priority priority, AppDbContext db) =>
            {

                var priorityReq = await db.Priorities.CountAsync(p => !p.IsDeleted);
                if (priorityReq < 1) //at least one entry in the database to be able to post
                {
                    return Results.BadRequest("There must be at least 1 Priority level");
                }
                priority.IsDeleted = false;
                priority.DateCreated = DateTime.Now;
                db.Priorities.Add(priority);
                await db.SaveChangesAsync();
                return Results.Created($"/api/priorities/{priority.PriorityId}", priority);
            });

            // PUT: /api/priorities/{id}
            group.MapPut("/{id:int}", async (int id, Priority updatedPriority, AppDbContext db) =>
            {
                var priority = await db.Priorities.FindAsync(id);
                if (priority is null) return Results.NotFound();

                priority.Name = updatedPriority.Name;  // Update properties as needed
                priority.IsDeleted = updatedPriority.IsDeleted;
                priority.DateCreated = updatedPriority.DateCreated;
                await db.SaveChangesAsync();
                return Results.NoContent();
            });

            // DELETE: /api/priorities/{id}
            group.MapDelete("/{id:int}", async (int id, AppDbContext db) =>
            {
                var priority = await db.Priorities.FindAsync(id);
                if (priority is null) return Results.NotFound();

                db.Priorities.Remove(priority);
                await db.SaveChangesAsync();
                return Results.NoContent();
            });
        }
    }

}
