using Lib.Net.Http.WebPush;
using System.Collections.Concurrent;

namespace Notification_App.Server
{
    public class InMemorySubscriptionStore
    {
        private readonly ConcurrentDictionary<string, PushSubscription> _subscriptions;

        public InMemorySubscriptionStore()
        {
            _subscriptions = new ConcurrentDictionary<string, PushSubscription>();
        }

        public void SaveSubscription(PushSubscription subscription)
        {
            _subscriptions[subscription.Endpoint] = subscription;
        }

        public void RemoveSubscription(string endpoint)
        {
            _subscriptions.TryRemove(endpoint, out _);
        }

        public List<PushSubscription> GetSubscriptions()
        {
            return new List<PushSubscription>(_subscriptions.Values);
        }
    }
}
