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
    public class TB_LivroController : Controller
    {
        private EditoraEntities1 db = new EditoraEntities1();

        // GET: TB_Livro
        public ActionResult Index()
        {
            return View(db.TB_Livro.ToList());
        }

        // GET: TB_Livro/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TB_Livro tB_Livro = db.TB_Livro.Find(id);
            if (tB_Livro == null)
            {
                return HttpNotFound();
            }
            return View(tB_Livro);
        }

        // GET: TB_Livro/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: TB_Livro/Create
        // Para se proteger de mais ataques, ative as propriedades específicas a que você quer se conectar. Para 
        // obter mais detalhes, consulte https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ID_Livro,Titulo,Descrição,Preco,Data_Publicacao,Numero_Paginas,Ilustrador,Tipo_Livro,ISBN")] TB_Livro tB_Livro)
        {
            if (ModelState.IsValid)
            {
                db.TB_Livro.Add(tB_Livro);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(tB_Livro);
        }

        // GET: TB_Livro/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TB_Livro tB_Livro = db.TB_Livro.Find(id);
            if (tB_Livro == null)
            {
                return HttpNotFound();
            }
            return View(tB_Livro);
        }

        // POST: TB_Livro/Edit/5
        // Para se proteger de mais ataques, ative as propriedades específicas a que você quer se conectar. Para 
        // obter mais detalhes, consulte https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID_Livro,Titulo,Descrição,Preco,Data_Publicacao,Numero_Paginas,Ilustrador,Tipo_Livro,ISBN")] TB_Livro tB_Livro)
        {
            if (ModelState.IsValid)
            {
                db.Entry(tB_Livro).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(tB_Livro);
        }

        // GET: TB_Livro/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TB_Livro tB_Livro = db.TB_Livro.Find(id);
            if (tB_Livro == null)
            {
                return HttpNotFound();
            }
            return View(tB_Livro);
        }

        // POST: TB_Livro/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            TB_Livro tB_Livro = db.TB_Livro.Find(id);
            db.TB_Livro.Remove(tB_Livro);
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
