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
    public class TB_EscolaController : Controller
    {
        private EditoraEntities1 db = new EditoraEntities1();

        // GET: TB_Escola
        public ActionResult Index()
        {
            var tB_Escola = db.TB_Escola.Include(t => t.TB_Cliente);
            return View(tB_Escola.ToList());
        }

        // GET: TB_Escola/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TB_Escola tB_Escola = db.TB_Escola.Find(id);
            if (tB_Escola == null)
            {
                return HttpNotFound();
            }
            return View(tB_Escola);
        }

        // GET: TB_Escola/Create
        public ActionResult Create()
        {
            ViewBag.ID_Cliente = new SelectList(db.TB_Cliente, "ID_Cliente", "ID_Cliente");
            return View();
        }

        // POST: TB_Escola/Create
        // Para se proteger de mais ataques, ative as propriedades específicas a que você quer se conectar. Para 
        // obter mais detalhes, consulte https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ID_Escola,ID_Cliente,Nome_Instituicao,CNPJ,Responsavel,Livro_Adotado,Serie_Adotada,Dt_Adotacao")] TB_Escola tB_Escola)
        {
            if (ModelState.IsValid)
            {
                db.TB_Escola.Add(tB_Escola);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.ID_Cliente = new SelectList(db.TB_Cliente, "ID_Cliente", "ID_Cliente", tB_Escola.ID_Cliente);
            return View(tB_Escola);
        }

        // GET: TB_Escola/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TB_Escola tB_Escola = db.TB_Escola.Find(id);
            if (tB_Escola == null)
            {
                return HttpNotFound();
            }
            ViewBag.ID_Cliente = new SelectList(db.TB_Cliente, "ID_Cliente", "ID_Cliente", tB_Escola.ID_Cliente);
            return View(tB_Escola);
        }

        // POST: TB_Escola/Edit/5
        // Para se proteger de mais ataques, ative as propriedades específicas a que você quer se conectar. Para 
        // obter mais detalhes, consulte https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID_Escola,ID_Cliente,Nome_Instituicao,CNPJ,Responsavel,Livro_Adotado,Serie_Adotada,Dt_Adotacao")] TB_Escola tB_Escola)
        {
            if (ModelState.IsValid)
            {
                db.Entry(tB_Escola).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.ID_Cliente = new SelectList(db.TB_Cliente, "ID_Cliente", "ID_Cliente", tB_Escola.ID_Cliente);
            return View(tB_Escola);
        }

        // GET: TB_Escola/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TB_Escola tB_Escola = db.TB_Escola.Find(id);
            if (tB_Escola == null)
            {
                return HttpNotFound();
            }
            return View(tB_Escola);
        }

        // POST: TB_Escola/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            TB_Escola tB_Escola = db.TB_Escola.Find(id);
            db.TB_Escola.Remove(tB_Escola);
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
