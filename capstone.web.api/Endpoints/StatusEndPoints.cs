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

    public static class StatusEndpoints
    {
        public static void MapStatusEndpoints(this IEndpointRouteBuilder routes)
        {
            var group = routes.MapGroup("/api/statuses");

            // GET: /api/statuses
            group.MapGet("/", async (AppDbContext db) =>
            {
                var statuses = await db.Statuses.Where(c => !c.IsDeleted).ToListAsync();
                return Results.Ok(statuses);
            });

            // GET: /api/statuses/{id}
            group.MapGet("/{id:int}", async (int id, AppDbContext db) =>
            {
                var status = await db.Statuses.Where(c => !c.IsDeleted).FirstOrDefaultAsync(c => c.StatusId == id);
                return status is not null ? Results.Ok(status) : Results.NotFound();
            });

            // POST: /api/statuses
            group.MapPost("/", async (Status status, AppDbContext db) =>
            {
                var statusReq = await db.Statuses.CountAsync(c => !c.IsDeleted);
                if (statusReq < 1) //at least one entry in the database to be able to post
                {
                    return Results.BadRequest("There must be at least 1 Status");
                }

                status.IsDeleted = false;
                status.DateCreated = DateTime.Now;
                db.Statuses.Add(status);
                await db.SaveChangesAsync();
                return Results.Created($"/api/statuses/{status.StatusId}", status);
            });

            // PUT: /api/statuses/{id}
            group.MapPut("/{id:int}", async (int id, Status updatedStatus, AppDbContext db) =>
            {
                var status = await db.Statuses.FindAsync(id);
                if (status is null) return Results.NotFound();

                // Propeties be updated.
                status.Name = updatedStatus.Name;
                status.DateCreated = updatedStatus.DateCreated;

                await db.SaveChangesAsync();
                return Results.NoContent();
            });

            // DELETE: /api/statuses/{id}
            group.MapDelete("/{id:int}", async (int id, AppDbContext db) =>
            {
                var status = await db.Statuses.FindAsync(id);
                if (status is null) return Results.NotFound();

                status.IsDeleted = true;
                await db.SaveChangesAsync();
                return Results.NoContent();
            });
        }
    }

}
