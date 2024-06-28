using Lib.Net.Http.WebPush;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace Notification_App.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PushNotificationController : ControllerBase
    {
        private readonly PushServiceClient _pushClient;
        private readonly InMemorySubscriptionStore _subscriptionStore; // Implement a store to save subscriptions

        public PushNotificationController(PushServiceClient pushClient, InMemorySubscriptionStore subscriptionStore)
        {
            _pushClient = pushClient;
            _subscriptionStore = subscriptionStore;
        }

        [HttpPost("subscribe")]
        public IActionResult Subscribe([FromBody] PushSubscription subscription)
        {
            _subscriptionStore.SaveSubscription(subscription);
            return Ok();
        }

        [HttpPost("send")]
        public async Task<IActionResult> SendNotification()
        {
            var subscriptions = _subscriptionStore.GetSubscriptions();

            foreach (var subscription in subscriptions)
            {
                var payload = JsonSerializer.Serialize(new { title = "Hello!", body = "You have a new notification." });
                var notification = new PushMessage(payload);

                try
                {
                    await _pushClient.RequestPushMessageDeliveryAsync(subscription, notification);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Failed to send notification: {ex.Message}");
                }
            }

            return Ok();
        }

        [HttpGet("test")]
        public IActionResult TestGetRequest()
        {
            return Ok("Hello from the server!");
        }
    }

}
