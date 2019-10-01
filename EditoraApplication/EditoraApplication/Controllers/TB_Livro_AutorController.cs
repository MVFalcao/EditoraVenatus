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
    public class TB_Livro_AutorController : Controller
    {
        private EditoraEntities1 db = new EditoraEntities1();

        // GET: TB_Livro_Autor
        public ActionResult Index()
        {
            var tB_Livro_Autor = db.TB_Livro_Autor.Include(t => t.TB_Autor).Include(t => t.TB_Livro);
            return View(tB_Livro_Autor.ToList());
        }

        // GET: TB_Livro_Autor/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TB_Livro_Autor tB_Livro_Autor = db.TB_Livro_Autor.Find(id);
            if (tB_Livro_Autor == null)
            {
                return HttpNotFound();
            }
            return View(tB_Livro_Autor);
        }

        // GET: TB_Livro_Autor/Create
        public ActionResult Create()
        {
            ViewBag.ID_Autor = new SelectList(db.TB_Autor, "ID_Autor", "CPF");
            ViewBag.ID_Livro = new SelectList(db.TB_Livro, "ID_Livro", "Titulo");
            return View();
        }

        // POST: TB_Livro_Autor/Create
        // Para se proteger de mais ataques, ative as propriedades específicas a que você quer se conectar. Para 
        // obter mais detalhes, consulte https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ID_Livro_Autor,ID_Livro,ID_Autor")] TB_Livro_Autor tB_Livro_Autor)
        {
            if (ModelState.IsValid)
            {
                db.TB_Livro_Autor.Add(tB_Livro_Autor);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.ID_Autor = new SelectList(db.TB_Autor, "ID_Autor", "CPF", tB_Livro_Autor.ID_Autor);
            ViewBag.ID_Livro = new SelectList(db.TB_Livro, "ID_Livro", "Titulo", tB_Livro_Autor.ID_Livro);
            return View(tB_Livro_Autor);
        }

        // GET: TB_Livro_Autor/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TB_Livro_Autor tB_Livro_Autor = db.TB_Livro_Autor.Find(id);
            if (tB_Livro_Autor == null)
            {
                return HttpNotFound();
            }
            ViewBag.ID_Autor = new SelectList(db.TB_Autor, "ID_Autor", "CPF", tB_Livro_Autor.ID_Autor);
            ViewBag.ID_Livro = new SelectList(db.TB_Livro, "ID_Livro", "Titulo", tB_Livro_Autor.ID_Livro);
            return View(tB_Livro_Autor);
        }

        // POST: TB_Livro_Autor/Edit/5
        // Para se proteger de mais ataques, ative as propriedades específicas a que você quer se conectar. Para 
        // obter mais detalhes, consulte https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID_Livro_Autor,ID_Livro,ID_Autor")] TB_Livro_Autor tB_Livro_Autor)
        {
            if (ModelState.IsValid)
            {
                db.Entry(tB_Livro_Autor).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.ID_Autor = new SelectList(db.TB_Autor, "ID_Autor", "CPF", tB_Livro_Autor.ID_Autor);
            ViewBag.ID_Livro = new SelectList(db.TB_Livro, "ID_Livro", "Titulo", tB_Livro_Autor.ID_Livro);
            return View(tB_Livro_Autor);
        }

        // GET: TB_Livro_Autor/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TB_Livro_Autor tB_Livro_Autor = db.TB_Livro_Autor.Find(id);
            if (tB_Livro_Autor == null)
            {
                return HttpNotFound();
            }
            return View(tB_Livro_Autor);
        }

        // POST: TB_Livro_Autor/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            TB_Livro_Autor tB_Livro_Autor = db.TB_Livro_Autor.Find(id);
            db.TB_Livro_Autor.Remove(tB_Livro_Autor);
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
