using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Mvc;
using HttpDeleteAttribute = System.Web.Http.HttpDeleteAttribute;
using HttpPostAttribute = System.Web.Http.HttpPostAttribute;
using RouteAttribute = System.Web.Http.RouteAttribute;

namespace EditoraAPI.Controllers
{
    public class UploadController : ApiController
    {
        [HttpPost]
        [Route("Upload")]
        [ResponseType(typeof(List<string>))]
        public async Task<HttpResponseMessage> Post()
        {
            // Ver se POST é MultiPart? 
            if (!Request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }
            // Preparar CustomMultipartFormDataStreamProvider para carga de dados
            // (veja mais abaixo)

            string fileSaveLocation = HttpContext.Current.Server.MapPath("~/Images");
            CustomMultipartFormDataStreamProvider provider = new CustomMultipartFormDataStreamProvider(fileSaveLocation);
            List<string> files = new List<string>();
            try
            {
                // Ler conteúdo da requisição para CustomMultipartFormDataStreamProvider. 
                await Request.Content.ReadAsMultipartAsync(provider);

                foreach (var file in provider.FileData)
                {
                    
                    files.Add(Path.GetFileName(file.LocalFileName));
                }
                // OK se tudo deu certo.
                var URL = Url.Content(Path.Combine("~/Images", files[0]));
                return Request.CreateResponse(HttpStatusCode.OK, URL);
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            }
        }
        
        [HttpDelete]
        [Route("DeletUpload")]
        [ResponseType(typeof(List<string>))]
        public HttpResponseMessage Delete(string image)
        {
            //var imagem = Path.GetFullPath(image);
            //var imagem = Url.Content(Path.Combine("~/Images", image));
            var imagem = Path.Combine(HttpContext.Current.Server.MapPath("~/Images"), image);
            try
            {

                if (File.Exists(imagem))
                {
                    File.Delete(imagem);
                    return Request.CreateResponse(HttpStatusCode.Accepted);
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }

            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            }
        }
        
    }

    public class CustomMultipartFormDataStreamProvider : MultipartFormDataStreamProvider
    {
        public CustomMultipartFormDataStreamProvider(string path) : base(path) { }

        public override string GetLocalFileName(HttpContentHeaders headers)
        {
            return alfanumericoAleatorio(40)+"_" + headers.ContentDisposition.FileName.Replace("\"", string.Empty);
        }
        public static string alfanumericoAleatorio(int tamanho)
        {
            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var random = new Random();
            var result = new string(
                Enumerable.Repeat(chars, tamanho)
                          .Select(s => s[random.Next(s.Length)])
                          .ToArray());
            return result;
        }
    }
}