//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace EditoraAPI.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class TB_Compra
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public TB_Compra()
        {
            this.TB_Carrinho = new HashSet<TB_Carrinho>();
        }
    
        public int ID_Compra { get; set; }
        public int ID_Cliente { get; set; }
        public int ID_Tipo { get; set; }
        public decimal Preco_total { get; set; }
        public System.DateTime Data_Pag { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TB_Carrinho> TB_Carrinho { get; set; }
        public virtual TB_Cliente TB_Cliente { get; set; }
        public virtual TB_Tipo TB_Tipo { get; set; }
    }
}
