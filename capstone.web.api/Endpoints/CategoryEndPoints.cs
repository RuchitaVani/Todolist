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

    public static class CategoryEndpoints
    {
        public static void MapCategoryEndpoints(this IEndpointRouteBuilder routes)
        {
            var group = routes.MapGroup("/api/categories");

            // GET: /api/categories
            group.MapGet("/", async (AppDbContext db) =>
            {
                var categories = await db.Categories.ToListAsync();
                return Results.Ok(categories);
            });

            // GET: /api/categories/{id}
            group.MapGet("/{id:int}", async (int id, AppDbContext db) =>
            {
                var category = await db.Categories.FindAsync(id);
                return category is not null ? Results.Ok(category) : Results.NotFound();
            });

            // POST: /api/categories
            group.MapPost("/", async (Category category, AppDbContext db) =>
            {
                db.Categories.Add(category);
                await db.SaveChangesAsync();
                return Results.Created($"/api/categories/{category.CategoryId}", category);
            });

            // PUT: /api/categories/{id}
            group.MapPut("/{id:int}", async (int id, Category updatedCategory, AppDbContext db) =>
            {
                var category = await db.Categories.FindAsync(id);
                if (category is null) return Results.NotFound();

                category.Name = updatedCategory.Name;  // Update properties as needed
                await db.SaveChangesAsync();
                return Results.NoContent();
            });

            // DELETE: /api/categories/{id}
            group.MapDelete("/{id:int}", async (int id, AppDbContext db) =>
            {
                var category = await db.Categories.FindAsync(id);
                if (category is null) return Results.NotFound();

                db.Categories.Remove(category);
                await db.SaveChangesAsync();
                return Results.NoContent();
            });
        }
    }

}
