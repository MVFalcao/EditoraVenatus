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
    public class TB_Cupom_LivroController : Controller
    {
        private EditoraEntities1 db = new EditoraEntities1();

        // GET: TB_Cupom_Livro
        public ActionResult Index()
        {
            var tB_Cupom_Livro = db.TB_Cupom_Livro.Include(t => t.TB_Cupom).Include(t => t.TB_Livro);
            return View(tB_Cupom_Livro.ToList());
        }

        // GET: TB_Cupom_Livro/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TB_Cupom_Livro tB_Cupom_Livro = db.TB_Cupom_Livro.Find(id);
            if (tB_Cupom_Livro == null)
            {
                return HttpNotFound();
            }
            return View(tB_Cupom_Livro);
        }

        // GET: TB_Cupom_Livro/Create
        public ActionResult Create()
        {
            ViewBag.ID_Cupom = new SelectList(db.TB_Cupom, "ID_Cupom", "Nome");
            ViewBag.ID_Livro = new SelectList(db.TB_Livro, "ID_Livro", "Titulo");
            return View();
        }

        // POST: TB_Cupom_Livro/Create
        // Para se proteger de mais ataques, ative as propriedades específicas a que você quer se conectar. Para 
        // obter mais detalhes, consulte https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ID_Cupom_Livro,ID_Cupom,ID_Livro")] TB_Cupom_Livro tB_Cupom_Livro)
        {
            if (ModelState.IsValid)
            {
                db.TB_Cupom_Livro.Add(tB_Cupom_Livro);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.ID_Cupom = new SelectList(db.TB_Cupom, "ID_Cupom", "Nome", tB_Cupom_Livro.ID_Cupom);
            ViewBag.ID_Livro = new SelectList(db.TB_Livro, "ID_Livro", "Titulo", tB_Cupom_Livro.ID_Livro);
            return View(tB_Cupom_Livro);
        }

        // GET: TB_Cupom_Livro/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TB_Cupom_Livro tB_Cupom_Livro = db.TB_Cupom_Livro.Find(id);
            if (tB_Cupom_Livro == null)
            {
                return HttpNotFound();
            }
            ViewBag.ID_Cupom = new SelectList(db.TB_Cupom, "ID_Cupom", "Nome", tB_Cupom_Livro.ID_Cupom);
            ViewBag.ID_Livro = new SelectList(db.TB_Livro, "ID_Livro", "Titulo", tB_Cupom_Livro.ID_Livro);
            return View(tB_Cupom_Livro);
        }

        // POST: TB_Cupom_Livro/Edit/5
        // Para se proteger de mais ataques, ative as propriedades específicas a que você quer se conectar. Para 
        // obter mais detalhes, consulte https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID_Cupom_Livro,ID_Cupom,ID_Livro")] TB_Cupom_Livro tB_Cupom_Livro)
        {
            if (ModelState.IsValid)
            {
                db.Entry(tB_Cupom_Livro).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.ID_Cupom = new SelectList(db.TB_Cupom, "ID_Cupom", "Nome", tB_Cupom_Livro.ID_Cupom);
            ViewBag.ID_Livro = new SelectList(db.TB_Livro, "ID_Livro", "Titulo", tB_Cupom_Livro.ID_Livro);
            return View(tB_Cupom_Livro);
        }

        // GET: TB_Cupom_Livro/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TB_Cupom_Livro tB_Cupom_Livro = db.TB_Cupom_Livro.Find(id);
            if (tB_Cupom_Livro == null)
            {
                return HttpNotFound();
            }
            return View(tB_Cupom_Livro);
        }

        // POST: TB_Cupom_Livro/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            TB_Cupom_Livro tB_Cupom_Livro = db.TB_Cupom_Livro.Find(id);
            db.TB_Cupom_Livro.Remove(tB_Cupom_Livro);
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
