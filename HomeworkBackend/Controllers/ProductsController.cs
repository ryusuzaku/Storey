// Controllers/ProductsController.cs
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Threading.Tasks;
using System.Text.Json;
using System.Collections.Generic;
using Microsoft.Extensions.Logging;

namespace YourNamespace.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<ProductsController> _logger;

        public ProductsController(IHttpClientFactory httpClientFactory, ILogger<ProductsController> logger)
        {
            _httpClient = httpClientFactory.CreateClient();
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var response = await _httpClient.GetAsync("https://dummyjson.com/products");
                response.EnsureSuccessStatusCode();

                var content = await response.Content.ReadAsStringAsync();
                var productResponse = JsonSerializer.Deserialize<ProductResponse>(content, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

                if (productResponse == null || productResponse.Products == null)
                {
                    _logger.LogError("Deserialization failed or Products list is null.");
                    return BadRequest("Failed to retrieve products.");
                }

                _logger.LogInformation("Successfully fetched {Count} products.", productResponse.Products.Count);
                return Ok(productResponse.Products);
            }
            catch (HttpRequestException httpEx)
            {
                _logger.LogError(httpEx, "HTTP request to dummyjson.com failed.");
                return StatusCode(503, "Service unavailable.");
            }
            catch (JsonException jsonEx)
            {
                _logger.LogError(jsonEx, "JSON deserialization failed.");
                return StatusCode(500, "Internal server error.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An unexpected error occurred.");
                return StatusCode(500, "Internal server error.");
            }
        }
    }

    public class ProductResponse
    {
        public int Total { get; set; }
        public int Skip { get; set; }
        public int Limit { get; set; }
        public List<Product> Products { get; set; }
    }

    public class Product
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string Category { get; set; }
        public decimal DiscountPercentage { get; set; }
        public double Rating { get; set; }
        public int Stock { get; set; }
        public List<string> Tags { get; set; }
        public string Brand { get; set; }
        public string Sku { get; set; }
        public double Weight { get; set; }
        public Dimensions Dimensions { get; set; }
        public string WarrantyInformation { get; set; }
        public string ShippingInformation { get; set; }
        public string AvailabilityStatus { get; set; }
        public List<Review> Reviews { get; set; }
        public string ReturnPolicy { get; set; }
        public int MinimumOrderQuantity { get; set; }
        public Meta Meta { get; set; }
        public List<string> Images { get; set; }
        public string Thumbnail { get; set; }
    }

    public class Dimensions
    {
        public double Width { get; set; }
        public double Height { get; set; }
        public double Depth { get; set; }
    }

    public class Review
    {
        public int Rating { get; set; }
        public string Comment { get; set; }
        public string Date { get; set; }
        public string ReviewerName { get; set; }
        public string ReviewerEmail { get; set; }
    }

    public class Meta
    {
        public string CreatedAt { get; set; }
        public string UpdatedAt { get; set; }
        public string Barcode { get; set; }
        public string QrCode { get; set; }
    }
}