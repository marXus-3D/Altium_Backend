using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

public class Program
{
    public static void Main(string[] args)
    {
        for (int i = 0; i < 3; i++)
        {
            string responseContent = await SendRequest();
            Console.WriteLine(responseContent);
        }
    }

    public static async Task<string> SendRequest ()
    {
        string requestBody = "I'm going to ask you to generate me a post that's preferably less than 255 characters long but it's not a problem if it exceeds format this post as a twitter post i want you to generate a post about any random think you can think of and don't forget to add relevant hashtags.";
        using (var httpClient = new HttpClient())
        {
            httpClient.BaseAddress = new Uri("https://generativelanguage.googleapis.com");

            // Set authorization header
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("x-goog-api-key", "AIzaSyCaCvcbS2zKq7MvWmkVfdZbK4qiVv1Pik0");

            // Create the request message
            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, "/v1/models/gemini-pro:generateContent");

            // Set content type header if request body is provided
            if (!string.IsNullOrEmpty(requestBody))
            {
                request.Content = new StringContent(requestBody, Encoding.UTF8, "application/json");

            }

            // Send the request asynchronously
            HttpResponseMessage response = await httpClient.SendAsync(request);

            // Check for successful response
            if (response.IsSuccessStatusCode)
            {
                string responseContent = await response.Content.ReadAsStringAsync();
                return responseContent;
            }
            else
            {
                throw new Exception($"Error sending request: StatusCode={response.StatusCode}");
            }
        }
    }
}