using Newtonsoft.Json.Linq;

namespace webhook_experiment.Formatter
{
    public class JsonReader
    {
        public static void PrintJsonKeyValuePairs(string json)
        {
            try
            {
                var parsedJson = JToken.Parse(json);
                PrintJsonRecursive(parsedJson);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error parsing JSON: " + ex.Message);
            }
        }

        public static void PrintJsonRecursive(JToken token, string prefix = "")
        {
            switch (token.Type)
            {
                case JTokenType.Object:
                    foreach (var prop in token.Children<JProperty>())
                    {
                        PrintJsonRecursive(prop.Value, prefix + prop.Name + ".");
                    }
                    break;
                case JTokenType.Array:
                    int index = 0;
                    foreach (var value in token.Children())
                    {
                        PrintJsonRecursive(value, $"{prefix}[{index}]");
                        index++;
                    }
                    break;
                default:  // for JTokenType.Property also
                    Console.WriteLine($"{prefix.TrimEnd('.')}: {token.ToString()}");
                    break;
            }
        }
    }
}
