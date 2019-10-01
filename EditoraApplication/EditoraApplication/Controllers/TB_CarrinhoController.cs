using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using EditoraApplication.Models;

namespace EditoraApplication.Controllers
{
    public class TB_CarrinhoController : Controller
    {
        private EditoraEntities1 db = new EditoraEntities1();

        // GET: TB_Carrinho
        public ActionResult Index()
        {
            var tB_Carrinho = db.TB_Carrinho.Include(t => t.TB_Compra).Include(t => t.TB_Livro);
            return View(tB_Carrinho.ToList());
        }

        // GET: TB_Carrinho/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TB_Carrinho tB_Carrinho = db.TB_Carrinho.Find(id);
            if (tB_Carrinho == null)
            {
                return HttpNotFound();
            }
            return View(tB_Carrinho);
        }

        // GET: TB_Carrinho/Create
        public ActionResult Create()
        {
            ViewBag.ID_Compra = new SelectList(db.TB_Compra, "ID_Compra", "ID_Compra");
            ViewBag.ID_Livro = new SelectList(db.TB_Livro, "ID_Livro", "Titulo");
            return View();
        }

        // POST: TB_Carrinho/Create
        // Para se proteger de mais ataques, ative as propriedades específicas a que você quer se conectar. Para 
        // obter mais detalhes, consulte https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ID_Carrinho,ID_Compra,ID_Livro,Quantidade_Livro,Preco_Total_Livro")] TB_Carrinho tB_Carrinho)
        {
            if (ModelState.IsValid)
            {
                db.TB_Carrinho.Add(tB_Carrinho);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.ID_Compra = new SelectList(db.TB_Compra, "ID_Compra", "ID_Compra", tB_Carrinho.ID_Compra);
            ViewBag.ID_Livro = new SelectList(db.TB_Livro, "ID_Livro", "Titulo", tB_Carrinho.ID_Livro);
            return View(tB_Carrinho);
        }

        // GET: TB_Carrinho/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TB_Carrinho tB_Carrinho = db.TB_Carrinho.Find(id);
            if (tB_Carrinho == null)
            {
                return HttpNotFound();
            }
            ViewBag.ID_Compra = new SelectList(db.TB_Compra, "ID_Compra", "ID_Compra", tB_Carrinho.ID_Compra);
            ViewBag.ID_Livro = new SelectList(db.TB_Livro, "ID_Livro", "Titulo", tB_Carrinho.ID_Livro);
            return View(tB_Carrinho);
        }

        // POST: TB_Carrinho/Edit/5
        // Para se proteger de mais ataques, ative as propriedades específicas a que você quer se conectar. Para 
        // obter mais detalhes, consulte https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID_Carrinho,ID_Compra,ID_Livro,Quantidade_Livro,Preco_Total_Livro")] TB_Carrinho tB_Carrinho)
        {
            if (ModelState.IsValid)
            {
                db.Entry(tB_Carrinho).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.ID_Compra = new SelectList(db.TB_Compra, "ID_Compra", "ID_Compra", tB_Carrinho.ID_Compra);
            ViewBag.ID_Livro = new SelectList(db.TB_Livro, "ID_Livro", "Titulo", tB_Carrinho.ID_Livro);
            return View(tB_Carrinho);
        }

        // GET: TB_Carrinho/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TB_Carrinho tB_Carrinho = db.TB_Carrinho.Find(id);
            if (tB_Carrinho == null)
            {
                return HttpNotFound();
            }
            return View(tB_Carrinho);
        }

        // POST: TB_Carrinho/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            TB_Carrinho tB_Carrinho = db.TB_Carrinho.Find(id);
            db.TB_Carrinho.Remove(tB_Carrinho);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
