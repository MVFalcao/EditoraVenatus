using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using EditoraAPI.Models;

namespace EditoraAPI.Controllers
{
    public class TB_EstoqueController : Controller
    {
        private EditoraEntities db = new EditoraEntities();

        // GET: TB_Estoque
        public ActionResult Index()
        {
            var tB_Estoque = db.TB_Estoque.Include(t => t.TB_Livro);
            return View(tB_Estoque.ToList());
        }

        // GET: TB_Estoque/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TB_Estoque tB_Estoque = db.TB_Estoque.Find(id);
            if (tB_Estoque == null)
            {
                return HttpNotFound();
            }
            return View(tB_Estoque);
        }

        // GET: TB_Estoque/Create
        public ActionResult Create()
        {
            ViewBag.ID_Livro = new SelectList(db.TB_Livro, "ID_Livro", "Titulo");
            return View();
        }

        // POST: TB_Estoque/Create
        // Para se proteger de mais ataques, ative as propriedades específicas a que você quer se conectar. Para 
        // obter mais detalhes, consulte https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ID_Estoque,ID_Livro,Quantidade")] TB_Estoque tB_Estoque)
        {
            if (ModelState.IsValid)
            {
                db.TB_Estoque.Add(tB_Estoque);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.ID_Livro = new SelectList(db.TB_Livro, "ID_Livro", "Titulo", tB_Estoque.ID_Livro);
            return View(tB_Estoque);
        }

        // GET: TB_Estoque/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TB_Estoque tB_Estoque = db.TB_Estoque.Find(id);
            if (tB_Estoque == null)
            {
                return HttpNotFound();
            }
            ViewBag.ID_Livro = new SelectList(db.TB_Livro, "ID_Livro", "Titulo", tB_Estoque.ID_Livro);
            return View(tB_Estoque);
        }

        // POST: TB_Estoque/Edit/5
        // Para se proteger de mais ataques, ative as propriedades específicas a que você quer se conectar. Para 
        // obter mais detalhes, consulte https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID_Estoque,ID_Livro,Quantidade")] TB_Estoque tB_Estoque)
        {
            if (ModelState.IsValid)
            {
                db.Entry(tB_Estoque).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.ID_Livro = new SelectList(db.TB_Livro, "ID_Livro", "Titulo", tB_Estoque.ID_Livro);
            return View(tB_Estoque);
        }

        // GET: TB_Estoque/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TB_Estoque tB_Estoque = db.TB_Estoque.Find(id);
            if (tB_Estoque == null)
            {
                return HttpNotFound();
            }
            return View(tB_Estoque);
        }

        // POST: TB_Estoque/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            TB_Estoque tB_Estoque = db.TB_Estoque.Find(id);
            db.TB_Estoque.Remove(tB_Estoque);
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
