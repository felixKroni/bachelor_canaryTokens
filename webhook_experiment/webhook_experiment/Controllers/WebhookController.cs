using Microsoft.AspNetCore.Mvc;
using webhook_experiment.Formatter;


namespace webhook_experiment.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WebhookController : ControllerBase
    {
        public WebhookController()
        {
            
        }

        [HttpPost]
        [Consumes("application/json")]
        public IActionResult Receive([FromBody] dynamic webhookData)
        {
            Console.WriteLine("============================================================================");
            Console.WriteLine($"Received webhook !!!");
            JsonReader.PrintJsonKeyValuePairs(webhookData.ToString());

            return Ok();
        }
    }

}
