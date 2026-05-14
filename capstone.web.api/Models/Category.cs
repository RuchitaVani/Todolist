using System.Text.Json.Serialization;

namespace capstone.web.api.Models
{
    public class Category
    {
        public int CategoryId { get; set; }
        public string Name { get; set; }
        public DateTime DateCreated { get; set; }
        public bool IsDeleted { get; set; }

        [JsonIgnore]
        public ICollection<Quest>? Quests { get; set; }

    }
}
