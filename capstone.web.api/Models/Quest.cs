using System.Text.Json.Serialization;

namespace capstone.web.api.Models
{
    public class Quest
    {
        public int QuestId { get; set; }
        public string Name { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DueDate { get; set; }
        public bool IsDeleted { get; set; }


        //Forgein Key
        public int CategoryId { get; set; }
        public int PriorityId { get; set; }
        public int UserId { get; set; }
        public int StatusId { get; set; }


        //Navigational properties
        [JsonIgnore]
        public Category? Category { get; set; }
        [JsonIgnore]
        public Priority? Priority { get; set; }
        [JsonIgnore]
        public Status? Status { get; set; }

        [JsonIgnore]
        public User? User { get; set; }


    }
}
