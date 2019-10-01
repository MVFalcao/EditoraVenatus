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
    public class TB_Cupom_PessoaController : Controller
    {
        private EditoraEntities1 db = new EditoraEntities1();

        // GET: TB_Cupom_Pessoa
        public ActionResult Index()
        {
            var tB_Cupom_Pessoa = db.TB_Cupom_Pessoa.Include(t => t.TB_Cupom).Include(t => t.TB_Pessoa);
            return View(tB_Cupom_Pessoa.ToList());
        }

        // GET: TB_Cupom_Pessoa/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TB_Cupom_Pessoa tB_Cupom_Pessoa = db.TB_Cupom_Pessoa.Find(id);
            if (tB_Cupom_Pessoa == null)
            {
                return HttpNotFound();
            }
            return View(tB_Cupom_Pessoa);
        }

        // GET: TB_Cupom_Pessoa/Create
        public ActionResult Create()
        {
            ViewBag.ID_Cupom = new SelectList(db.TB_Cupom, "ID_Cupom", "Nome");
            ViewBag.ID_Pessoa = new SelectList(db.TB_Pessoa, "ID_Pessoa", "CPF");
            return View();
        }

        // POST: TB_Cupom_Pessoa/Create
        // Para se proteger de mais ataques, ative as propriedades específicas a que você quer se conectar. Para 
        // obter mais detalhes, consulte https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ID_Cupom_Pessoa,ID_Cupom,ID_Pessoa")] TB_Cupom_Pessoa tB_Cupom_Pessoa)
        {
            if (ModelState.IsValid)
            {
                db.TB_Cupom_Pessoa.Add(tB_Cupom_Pessoa);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.ID_Cupom = new SelectList(db.TB_Cupom, "ID_Cupom", "Nome", tB_Cupom_Pessoa.ID_Cupom);
            ViewBag.ID_Pessoa = new SelectList(db.TB_Pessoa, "ID_Pessoa", "CPF", tB_Cupom_Pessoa.ID_Pessoa);
            return View(tB_Cupom_Pessoa);
        }

        // GET: TB_Cupom_Pessoa/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TB_Cupom_Pessoa tB_Cupom_Pessoa = db.TB_Cupom_Pessoa.Find(id);
            if (tB_Cupom_Pessoa == null)
            {
                return HttpNotFound();
            }
            ViewBag.ID_Cupom = new SelectList(db.TB_Cupom, "ID_Cupom", "Nome", tB_Cupom_Pessoa.ID_Cupom);
            ViewBag.ID_Pessoa = new SelectList(db.TB_Pessoa, "ID_Pessoa", "CPF", tB_Cupom_Pessoa.ID_Pessoa);
            return View(tB_Cupom_Pessoa);
        }

        // POST: TB_Cupom_Pessoa/Edit/5
        // Para se proteger de mais ataques, ative as propriedades específicas a que você quer se conectar. Para 
        // obter mais detalhes, consulte https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID_Cupom_Pessoa,ID_Cupom,ID_Pessoa")] TB_Cupom_Pessoa tB_Cupom_Pessoa)
        {
            if (ModelState.IsValid)
            {
                db.Entry(tB_Cupom_Pessoa).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.ID_Cupom = new SelectList(db.TB_Cupom, "ID_Cupom", "Nome", tB_Cupom_Pessoa.ID_Cupom);
            ViewBag.ID_Pessoa = new SelectList(db.TB_Pessoa, "ID_Pessoa", "CPF", tB_Cupom_Pessoa.ID_Pessoa);
            return View(tB_Cupom_Pessoa);
        }

        // GET: TB_Cupom_Pessoa/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TB_Cupom_Pessoa tB_Cupom_Pessoa = db.TB_Cupom_Pessoa.Find(id);
            if (tB_Cupom_Pessoa == null)
            {
                return HttpNotFound();
            }
            return View(tB_Cupom_Pessoa);
        }

        // POST: TB_Cupom_Pessoa/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            TB_Cupom_Pessoa tB_Cupom_Pessoa = db.TB_Cupom_Pessoa.Find(id);
            db.TB_Cupom_Pessoa.Remove(tB_Cupom_Pessoa);
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
