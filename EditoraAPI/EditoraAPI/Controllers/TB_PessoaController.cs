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
    public class TB_PessoaController : Controller
    {
        private EditoraEntities db = new EditoraEntities();

        // GET: TB_Pessoa
        public ActionResult Index()
        {
            var tB_Pessoa = db.TB_Pessoa.Include(t => t.TB_Cliente);
            return View(tB_Pessoa.ToList());
        }

        // GET: TB_Pessoa/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TB_Pessoa tB_Pessoa = db.TB_Pessoa.Find(id);
            if (tB_Pessoa == null)
            {
                return HttpNotFound();
            }
            return View(tB_Pessoa);
        }

        // GET: TB_Pessoa/Create
        public ActionResult Create()
        {
            ViewBag.ID_Cliente = new SelectList(db.TB_Cliente, "ID_Cliente", "ID_Cliente");
            return View();
        }

        // POST: TB_Pessoa/Create
        // Para se proteger de mais ataques, ative as propriedades específicas a que você quer se conectar. Para 
        // obter mais detalhes, consulte https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ID_Pessoa,ID_Cliente,CPF,Nome,Desconto,Tipo_Pessoa,Sexo,data_nascimento")] TB_Pessoa tB_Pessoa)
        {
            if (ModelState.IsValid)
            {
                db.TB_Pessoa.Add(tB_Pessoa);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.ID_Cliente = new SelectList(db.TB_Cliente, "ID_Cliente", "ID_Cliente", tB_Pessoa.ID_Cliente);
            return View(tB_Pessoa);
        }

        // GET: TB_Pessoa/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TB_Pessoa tB_Pessoa = db.TB_Pessoa.Find(id);
            if (tB_Pessoa == null)
            {
                return HttpNotFound();
            }
            ViewBag.ID_Cliente = new SelectList(db.TB_Cliente, "ID_Cliente", "ID_Cliente", tB_Pessoa.ID_Cliente);
            return View(tB_Pessoa);
        }

        // POST: TB_Pessoa/Edit/5
        // Para se proteger de mais ataques, ative as propriedades específicas a que você quer se conectar. Para 
        // obter mais detalhes, consulte https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID_Pessoa,ID_Cliente,CPF,Nome,Desconto,Tipo_Pessoa,Sexo,data_nascimento")] TB_Pessoa tB_Pessoa)
        {
            if (ModelState.IsValid)
            {
                db.Entry(tB_Pessoa).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.ID_Cliente = new SelectList(db.TB_Cliente, "ID_Cliente", "ID_Cliente", tB_Pessoa.ID_Cliente);
            return View(tB_Pessoa);
        }

        // GET: TB_Pessoa/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TB_Pessoa tB_Pessoa = db.TB_Pessoa.Find(id);
            if (tB_Pessoa == null)
            {
                return HttpNotFound();
            }
            return View(tB_Pessoa);
        }

        // POST: TB_Pessoa/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            TB_Pessoa tB_Pessoa = db.TB_Pessoa.Find(id);
            db.TB_Pessoa.Remove(tB_Pessoa);
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
