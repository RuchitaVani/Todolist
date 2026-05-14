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
                var categories = await db.Categories.Where(c => !c.IsDeleted).ToListAsync();
                return Results.Ok(categories);
            });

            // GET: /api/categories/{id}
            group.MapGet("/{id:int}", async (int id, AppDbContext db) =>
            {
                var category = await db.Categories.Where(c => !c.IsDeleted).FirstOrDefaultAsync(c => c.CategoryId == id);
                return category is not null ? Results.Ok(category) : Results.NotFound();
            });

            // POST: /api/categories
            group.MapPost("/", async (Category category, AppDbContext db) =>
            {
                var categoryReq = await db.Categories.CountAsync(c => !c.IsDeleted);
                if (categoryReq < 1) //at least one entry in the database to be able to post
                {
                    return Results.BadRequest("There must be at least 1 Category");
                }

                category.IsDeleted = false;
                category.DateCreated = DateTime.Now;
                db.Categories.Add(category);
                await db.SaveChangesAsync();
                return Results.Created($"/api/categories/{category.CategoryId}", category);
            });

            // PUT: /api/categories/{id}
            group.MapPut("/{id:int}", async (int id, Category updatedCategory, AppDbContext db) =>
            {
                var category = await db.Categories.FindAsync(id);
                if (category is null) return Results.NotFound();

                // Propeties be updated.
                category.Name = updatedCategory.Name;  
                category.DateCreated = updatedCategory.DateCreated;

                await db.SaveChangesAsync();
                return Results.NoContent();
            });

            // DELETE: /api/categories/{id}
            group.MapDelete("/{id:int}", async (int id, AppDbContext db) =>
            {
                var category = await db.Categories.FindAsync(id);
                if (category is null) return Results.NotFound();

                category.IsDeleted = true;
                await db.SaveChangesAsync();
                return Results.NoContent();
            });
        }
    }

}
