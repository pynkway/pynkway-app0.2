import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Image as ImageIcon, Plus, Trash2, Eye, EyeOff, GripVertical,
  Upload, X, Save, BadgeCheck, Pencil,
} from "lucide-react";
import { type GalleryImage, mockGallery } from "@/data/gallery";

const GallerySection = () => {
  const [images, setImages] = useState<GalleryImage[]>(
    mockGallery.filter((g) => g.creatorId === "1").sort((a, b) => a.order - b.order)
  );
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editCaption, setEditCaption] = useState("");
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newImages: GalleryImage[] = Array.from(files).map((file, i) => ({
      id: crypto.randomUUID(),
      creatorId: "1",
      src: URL.createObjectURL(file),
      caption: "",
      isPublic: true,
      order: images.length + i,
    }));
    setImages((prev) => [...prev, ...newImages]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const deleteImage = (id: string) => setImages((prev) => prev.filter((img) => img.id !== id));

  const toggleVisibility = (id: string) =>
    setImages((prev) => prev.map((img) => (img.id === id ? { ...img, isPublic: !img.isPublic } : img)));

  const startEdit = (img: GalleryImage) => { setEditingId(img.id); setEditCaption(img.caption); };

  const saveCaption = () => {
    if (editingId) {
      setImages((prev) => prev.map((img) => (img.id === editingId ? { ...img, caption: editCaption } : img)));
      setEditingId(null);
    }
  };

  const handleReorder = useCallback((reordered: GalleryImage[]) => {
    setImages(reordered.map((img, i) => ({ ...img, order: i })));
  }, []);

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const publicCount = images.filter((i) => i.isPublic).length;

  return (
    <div>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-xl gradient-brand flex items-center justify-center">
            <ImageIcon className="h-5 w-5 text-primary-foreground" />
          </div>
          <h1 className="font-display text-3xl font-bold">Gallery</h1>
        </div>
        <p className="text-muted-foreground">Manage your photos. Drag to reorder. Toggle visibility for each image.</p>
      </motion.div>

      {/* Stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="glass-card rounded-2xl p-4 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="text-lg font-display font-bold">{images.length}</p>
            <p className="text-[10px] text-muted-foreground">Total</p>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center">
            <p className="text-lg font-display font-bold text-primary">{publicCount}</p>
            <p className="text-[10px] text-muted-foreground">Public</p>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center">
            <p className="text-lg font-display font-bold text-muted-foreground">{images.length - publicCount}</p>
            <p className="text-[10px] text-muted-foreground">Private</p>
          </div>
        </div>
      </motion.div>

      {/* Upload */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mb-6">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full glass-card rounded-2xl border-2 border-dashed border-border hover:border-primary/30 transition-colors p-8 flex flex-col items-center gap-3 group"
        >
          <div className="h-12 w-12 rounded-xl gradient-brand-subtle flex items-center justify-center group-hover:scale-110 transition-transform">
            <Upload className="h-6 w-6 text-primary" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium">Upload Photos</p>
            <p className="text-xs text-muted-foreground">JPG, PNG or WebP · Max 10 MB per image · Multiple files supported</p>
          </div>
        </button>
        <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleUpload} />
      </motion.div>

      {/* Gallery Grid – Reorderable */}
      {images.length > 0 ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-medium text-muted-foreground">Drag images to reorder · First image = profile cover</p>
          </div>

          <Reorder.Group axis="y" values={images} onReorder={handleReorder} className="space-y-3">
            {images.map((img, i) => (
              <Reorder.Item key={img.id} value={img} className="list-none">
                <div className={`glass-card rounded-2xl border overflow-hidden transition-all ${
                  img.isPublic ? "border-primary/10" : "border-border opacity-70"
                }`}>
                  <div className="flex items-stretch">
                    {/* Drag Handle */}
                    <div className="flex items-center px-2 cursor-grab active:cursor-grabbing bg-secondary/30 hover:bg-secondary/50 transition-colors">
                      <GripVertical className="h-4 w-4 text-muted-foreground" />
                    </div>

                    {/* Thumbnail */}
                    <div className="w-20 h-20 flex-shrink-0 relative">
                      <img src={img.src} alt={img.caption || "Gallery image"} className="w-full h-full object-cover" />
                      {i === 0 && (
                        <div className="absolute top-1 left-1">
                          <Badge className="text-[8px] px-1.5 py-0 gradient-brand text-primary-foreground border-0">Cover</Badge>
                        </div>
                      )}
                      {!img.isPublic && (
                        <div className="absolute inset-0 bg-foreground/20 flex items-center justify-center">
                          <EyeOff className="h-4 w-4 text-primary-foreground" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 p-3 min-w-0">
                      {editingId === img.id ? (
                        <div className="flex gap-2">
                          <Input value={editCaption} onChange={(e) => setEditCaption(e.target.value)}
                            placeholder="Add caption..." className="rounded-lg text-xs h-8 flex-1"
                            onKeyDown={(e) => e.key === "Enter" && saveCaption()} autoFocus />
                          <Button size="sm" variant="ghost" className="h-8 px-2" onClick={saveCaption}>
                            <BadgeCheck className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      ) : (
                        <button onClick={() => startEdit(img)} className="text-left w-full group/caption">
                          <p className="text-sm font-medium truncate">
                            {img.caption || <span className="text-muted-foreground italic">Add caption...</span>}
                            <Pencil className="h-3 w-3 text-muted-foreground inline ml-1.5 opacity-0 group-hover/caption:opacity-100 transition-opacity" />
                          </p>
                        </button>
                      )}
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-[9px]">
                          {img.isPublic ? "Public" : "Private"}
                        </Badge>
                        <span className="text-[10px] text-muted-foreground">Position {i + 1}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 px-3">
                      <button onClick={() => toggleVisibility(img.id)}
                        className="p-2 rounded-full hover:bg-secondary transition-colors" title={img.isPublic ? "Make private" : "Make public"}>
                        {img.isPublic
                          ? <Eye className="h-4 w-4 text-primary" />
                          : <EyeOff className="h-4 w-4 text-muted-foreground" />}
                      </button>
                      <button onClick={() => deleteImage(img.id)}
                        className="p-2 rounded-full hover:bg-destructive/10 transition-colors">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </button>
                    </div>
                  </div>
                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </motion.div>
      ) : (
        <div className="text-center py-16">
          <ImageIcon className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground">No photos yet. Upload your first image above.</p>
        </div>
      )}

      {/* Save */}
      {images.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="mt-6">
          <Button onClick={handleSave}
            className="w-full rounded-xl gradient-brand text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/20 gap-2 py-6 text-base font-semibold">
            {saved ? <><BadgeCheck className="h-5 w-5" />Saved!</> : <><Save className="h-5 w-5" />Save Gallery</>}
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default GallerySection;
