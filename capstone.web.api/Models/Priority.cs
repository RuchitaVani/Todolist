namespace capstone.web.api.Models
{
    public class Priority
    {
        public int PriorityId { get; set; }
        public string Name { get; set; }
        public DateTime DateCreated { get; set; }
        public bool IsDeleted { get; set; }
    }
}
