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
    public class TB_AutorController : Controller
    {
        private EditoraEntities1 db = new EditoraEntities1();

        // GET: TB_Autor
        public ActionResult Index()
        {
            return View(db.TB_Autor.ToList());
        }

        // GET: TB_Autor/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TB_Autor tB_Autor = db.TB_Autor.Find(id);
            if (tB_Autor == null)
            {
                return HttpNotFound();
            }
            return View(tB_Autor);
        }

        // GET: TB_Autor/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: TB_Autor/Create
        // Para se proteger de mais ataques, ative as propriedades específicas a que você quer se conectar. Para 
        // obter mais detalhes, consulte https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ID_Autor,CPF,Nome")] TB_Autor tB_Autor)
        {
            if (ModelState.IsValid)
            {
                db.TB_Autor.Add(tB_Autor);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(tB_Autor);
        }

        // GET: TB_Autor/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TB_Autor tB_Autor = db.TB_Autor.Find(id);
            if (tB_Autor == null)
            {
                return HttpNotFound();
            }
            return View(tB_Autor);
        }

        // POST: TB_Autor/Edit/5
        // Para se proteger de mais ataques, ative as propriedades específicas a que você quer se conectar. Para 
        // obter mais detalhes, consulte https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID_Autor,CPF,Nome")] TB_Autor tB_Autor)
        {
            if (ModelState.IsValid)
            {
                db.Entry(tB_Autor).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(tB_Autor);
        }

        // GET: TB_Autor/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TB_Autor tB_Autor = db.TB_Autor.Find(id);
            if (tB_Autor == null)
            {
                return HttpNotFound();
            }
            return View(tB_Autor);
        }

        // POST: TB_Autor/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            TB_Autor tB_Autor = db.TB_Autor.Find(id);
            db.TB_Autor.Remove(tB_Autor);
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
