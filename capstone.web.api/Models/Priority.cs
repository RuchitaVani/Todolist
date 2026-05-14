using System.Text.Json.Serialization;

namespace capstone.web.api.Models
{
    public class Priority
    {
        public int PriorityId { get; set; }
        public string Name { get; set; }
        public DateTime DateCreated { get; set; }
        public bool IsDeleted { get; set; }
        public string color { get; set; }


        [JsonIgnore]
        public ICollection<Quest>? Quests { get; set; }
        
    }
}
