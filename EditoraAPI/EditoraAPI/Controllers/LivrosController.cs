﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using EditoraAPI.Models;
using EditoraAPI.Tokens;
using Grafo;


namespace EditoraAPI.Controllers
{
    public class LivrosController : ApiController
    {
        private EditoraAPIContext db = new EditoraAPIContext();
        private EncodingTokenLogin en = new EncodingTokenLogin();
        private string Categoria =null;
        // GET: api/Livros
        public IQueryable<Livro> Getlivros()
        {
            return db.livros;
        }

        // GET: api/Livros/Lancamento
        [ResponseType(typeof(IQueryable<Livro>))]
        [Route("api/Livros/Lancamento")]
        [HttpGet]
        public IQueryable<Livro> GetlivrosLancamentos()
        {
            return db.livros.OrderByDescending(l => l.Datapublicacao);
        }

        // GET: api/Livros/5
        [ResponseType(typeof(Livro))]
        public IHttpActionResult GetLivro(int id)
        {
            
            Livro livro = db.livros.Find(id);
            if (livro == null)
            {
                return NotFound();
            }

            return Ok(livro);
        }

        //GET : api/LivrosNome
        [ResponseType(typeof(Livro))]
        [Route("api/GetLivrosNome/")]
        public IHttpActionResult GetLivrosNome(string Nome)
        {
            try
            {
                var liv = from l in db.livros where l.Titulo.StartsWith(Nome) select new { l.ID_Livro,l.Imagem_URL,l.Titulo,l.SubTitulo,l.Preco,l.Botao_URL };
                if (liv == null)
                {
                    return NotFound();
                }

                return Ok(liv);
            }catch(Exception e)
            {
                return NotFound();
            }
            
        }

        // PUT: api/Livros/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutLivro(int id, Livro livro)
        {
            var headers = Request.Headers;
            if (headers.Contains("jwt"))
            {
                try
                {
                    en.ValidToken(headers.GetValues("jwt").First());
                }
                catch (Exception e)
                {
                    return NotFound();
                }

            }
            else
            {
                return NotFound();
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != livro.ID_Livro)
            {
                return BadRequest();
            }

            db.Entry(livro).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LivroExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Livros
        [ResponseType(typeof(Livro))]
        public IHttpActionResult PostLivro(Livro livro)
        {
            var headers = Request.Headers;
            if (headers.Contains("jwt"))
            {
                try
                {
                    en.ValidToken(headers.GetValues("jwt").First());
                }
                catch (Exception e)
                {
                    return NotFound();
                }

            }
            else
            {
                return NotFound();
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.livros.Add(livro);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = livro.ID_Livro }, livro);
        }

        // DELETE: api/Livros/5
        [ResponseType(typeof(Livro))]
        public IHttpActionResult DeleteLivro(int id)
        {
            var headers = Request.Headers;
            if (headers.Contains("jwt"))
            {
                try
                {
                    en.ValidToken(headers.GetValues("jwt").First());
                }
                catch (Exception e)
                {
                    return NotFound();
                }

            }
            else
            {
                return NotFound();
            }
            Livro livro = db.livros.Find(id);
            if (livro == null)
            {
                return NotFound();
            }

            db.livros.Remove(livro);
            db.SaveChanges();

            return Ok(livro);
        }
        [ResponseType(typeof(Livro))]
        [Route("api/LivrosName")]
        public IHttpActionResult VizualizeByStringLivro(string nome)
        {
            try
            {
                var livro = from l in db.livros join aut in db.autors on l.Id_autor equals aut.ID_Autor where nome == l.Titulo select new { l.Titulo, aut.Nome, l.SubTitulo, l.Sinopse, l.Numero_Paginas, l.ISBN, l.Ilustrador, l.Descricao, l.Classificacao_Indicativa, l.Datapublicacao, l.Formato, l.Idioma };
                if (livro == null)
                {
                    return NotFound();
                }
                else return Ok(livro);
            }
            catch(Exception e)
            {
                return BadRequest();
            }
                
        }
        [ResponseType(typeof(Livro))]
        [Route("api/LivrosISBN")]
        public IHttpActionResult VizualizeByISBNLivro(string nome)
        {
            try
            {
                var livro = from l in db.livros join aut in db.autors on l.Id_autor equals aut.ID_Autor where nome == l.ISBN select new { l.Titulo,aut.Nome, l.SubTitulo, l.Sinopse, l.Numero_Paginas, l.ISBN, l.Ilustrador, l.Descricao, l.Classificacao_Indicativa, l.Datapublicacao, l.Formato, l.Idioma };
                if (livro == null)
                {
                    return NotFound();
                }
                else return Ok(livro);
            }
            catch (Exception e)
            {
                return BadRequest();
            }

        }
        [ResponseType(typeof(Livro))]
        [Route("api/LivrosSubtitle")]
        public IHttpActionResult VizualizeBySubtitleLivro(string nome)
        {
            try
            {
                var livro = from l in db.livros join aut in db.autors on l.Id_autor equals aut.ID_Autor where nome == l.SubTitulo select new { l.Titulo, aut.Nome, l.SubTitulo, l.Sinopse, l.Numero_Paginas, l.ISBN, l.Ilustrador, l.Descricao, l.Classificacao_Indicativa, l.Datapublicacao, l.Formato, l.Idioma };
                if (livro == null)
                {
                    return NotFound();
                }
                else return Ok(livro);
            }
            catch (Exception e)
            {
                return BadRequest();
            }

        }
        [Route("api/GetCategoria")]
        public IHttpActionResult GetCat(string mat)
        {
            try
            {
                var livro = from l in db.livros where mat == l.Categoria select l.Categoria;
                if(livro == null)
                {
                    NotFound();
                }
                Categoria = livro.FirstOrDefault();
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
            
        }

        [Route("api/garfo")]
        [HttpPost]
        public IHttpActionResult GrafoLivros()
        {
            try
            {
                if (Categoria == null)
                {
                    return BadRequest();
                }
                else
                    inicializagrafo();
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
           

        }
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool LivroExists(int id)
        {
            return db.livros.Count(e => e.ID_Livro == id) > 0;
        }
    }
}