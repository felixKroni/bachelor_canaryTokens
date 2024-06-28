using canary_experiment.Models;
using Microsoft.EntityFrameworkCore;

namespace canary_experiment.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options): base(options){ }
        public DbSet<Human> Humans { get; set; }
    }
}
